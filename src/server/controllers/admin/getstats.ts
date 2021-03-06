import { Context } from 'koa';
import authToken from '../../services/authToken';
import getFilmBoxOffice from '../../services/getFilmBoxOffice';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

// 查询系统总用户数
const queryUserCountStr = `
select count(*) as userCount from user
where user.character='user'
`;

// 查询本分店总销售额
const querySaleCountStr = `
select sum(orderlist.total_price) as saleCount
from orderlist, arrangement, hall
where
  orderlist.status=0 and
  orderlist.arrangement_id = arrangement.arrangement_id and
  arrangement.hall_id = hall.hall_id and
  hall.cinema_id = ?
`;

// 查询本分店日销售额
const queryDailySaleStr = `
select sum(orderlist.total_price) as value, left(orderlist.time,10) as date
from orderlist, arrangement, hall
where
  orderlist.status = 0 and
  orderlist.arrangement_id = arrangement.arrangement_id and
  arrangement.hall_id = hall.hall_id and
  hall.cinema_id = ?
group by left(time,10)
order by date
`;

// 查询各影片在本系统中的上座率
const querySeatsStr = `
select zh_name as filmName, seats from film natural join arrangement
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const body: Models['GET/admin/getstats']['Res'] = {
    code: -1,
    message: '',
    data: {
      users: 0,
      sales: 0,
      dailySales: [],
      boxOffice: [],
      seatRate: [],
    },
  };
  try {
    const userID = await authToken(token);

    const [userCountRows]: any = await mysql.execute(queryUserCountStr);
    body.data.users = userCountRows[0].userCount;

    const [saleCountRows]: any = await mysql.execute(querySaleCountStr, [
      userID,
    ]);
    body.data.sales = saleCountRows[0].saleCount || 0;

    const [dailySalesRows]: any[][] = await mysql.execute(queryDailySaleStr, [
      userID,
    ]);
    body.data.dailySales = dailySalesRows.map((v) => ({
      date: v.date,
      value: v.value,
    }));

    // 获取IMDb和电影名称的映射字典
    const [filmRows]: any[][] = await mysql.execute('select * from film');
    const filmIMDbToNames: Record<string, string> = {};
    for (let i = 0; i < filmRows.length; i += 1) {
      filmIMDbToNames[filmRows[i].IMDb] = filmRows[i].zh_name;
    }

    // 只统计有票房的电影
    const filmBoxOffices = await getFilmBoxOffice();
    body.data.boxOffice = Object.keys(filmBoxOffices).map((key) => ({
      value: filmBoxOffices[key],
      filmName: filmIMDbToNames[key],
    }));

    const [seatsRows]: any[][] = await mysql.execute(querySeatsStr);
    const filmSeats: Record<string, { total: number; used: number }> = {};
    for (let i = 0; i < seatsRows.length; i += 1) {
      const { filmName } = seatsRows[i];
      const seatMatrix: number[][] = JSON.parse(seatsRows[i].seats);
      // 检查座位矩阵，统计 上座数 / 座位总数 = 上座率
      let used = 0;
      let total = 0;
      for (let si = 0; si < seatMatrix.length; si += 1) {
        for (let sj = 0; sj < seatMatrix[si].length; sj += 1) {
          if (seatMatrix[si][sj] !== 0) {
            total += 1;
          }
          if (seatMatrix[si][sj] === 2) {
            used += 1;
          }
        }
      }
      if (filmSeats[filmName]) {
        filmSeats[filmName].total += total;
        filmSeats[filmName].used += used;
      } else {
        filmSeats[filmName] = { total, used };
      }
    }
    const keys = Object.keys(filmSeats);
    const seatRate: {
      filmName: string;
      value: number;
    }[] = [];
    // 计算上座率
    for (let si = 0; si < keys.length; si += 1) {
      seatRate.push({
        filmName: keys[si],
        value: filmSeats[keys[si]].used / filmSeats[keys[si]].total,
      });
    }
    body.data.seatRate = seatRate;

    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = String(error);
  } finally {
    ctx.body = body;
  }
};
