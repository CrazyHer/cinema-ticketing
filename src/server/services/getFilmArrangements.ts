import moment from 'moment';
import mysql from '../utils/mysql';

// 只查询用户本地区的排片情况
const querystr = `
select
  user.username as cinema,
  hall.name as hall,
  arrangement.time as time,
  arrangement.seats as seats,
  arrangement.price as price,
  arrangement.arrangement_id as arrangementID
from user, hall, arrangement
where
  arrangement.IMDb = ? and
  arrangement.hall_id = hall.hall_id and
  hall.cinema_id = user.user_id and
  user.address = (select address from user where user_id = ?)
`;

export default async (
  IMDb: string,
  userID: string
): Promise<
  {
    cinema: string;
    hall: string;
    time: string;
    seats: number[][];
    price: number;
    arrangementID: number;
  }[]
> => {
  const [rows]: any[][] = await mysql.execute(querystr, [IMDb, userID]);
  // 只查询将来的排片，过去的排片不再显示
  return rows
    .map((row) => ({
      cinema: row.cinema,
      hall: row.hall,
      time: row.time,
      seats: JSON.parse(row.seats),
      price: Number(row.price),
      arrangementID: row.arrangementID,
    }))
    .filter((v) => moment(v.time, 'YYYY-MM-DD HH:mm').unix() > moment().unix());
};
