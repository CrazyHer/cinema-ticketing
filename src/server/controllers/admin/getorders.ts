import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

// 只查询本分店的订单
const queryStr = `
select
  orderlist.order_id as orderID,
  orderlist.user_id as userID,
  film.zh_name as filmName,
  hall.name as hall,
  orderlist.time as time,
  orderlist.selected_seats as selectedSeats,
  orderlist.total_price as totalPrice,
  orderlist.status as status
from orderlist, user, hall, arrangement, film where
  orderlist.arrangement_id = arrangement.arrangement_id and
  arrangement.IMDb = film.IMDb and
  arrangement.hall_id = hall.hall_id and
  hall.cinema_id = user.user_id and
  hall.cinema_id = ?
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;

  const body: Models['GET/admin/getorders']['Res'] = {
    code: -1,
    message: '',
    data: [],
  };
  try {
    const userID = await authToken(token);

    const [rows]: any[][] = await mysql.execute(queryStr, [userID]);
    body.data = rows.map((v) => ({
      orderID: v.orderID,
      userID: v.userID,
      filmName: v.filmName,
      hall: v.hall,
      time: v.time,
      selectedSeats: JSON.parse(v.selectedSeats),
      totalPrice: v.totalPrice,
      // 在管理端，无论订单是否已完成，都可以退款
      status: Number(v.status) === 2 ? 2 : 0,
    }));
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = String(error);
  } finally {
    ctx.body = body;
  }
};
