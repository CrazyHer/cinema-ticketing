import { Context } from 'koa';
import moment from 'moment';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const querystr = `
select
  user.username as cinema,
  hall.name as hall,
  orderlist.time as time,
  arrangement.time as arrangementTime,
  orderlist.selected_seats as selectedSeats,
  orderlist.total_price as totalPrice,
  orderlist.status as status,
  orderlist.order_id as orderID
from orderlist, user, hall, arrangement where
  orderlist.user_id = ? and
  orderlist.arrangement_id = arrangement.arrangement_id and
  arrangement.hall_id = hall.hall_id and
  hall.cinema_id = user.user_id
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const body: Models['GET/user/getmyorders']['Res'] = {
    code: -1,
    message: '',
    data: [],
  };
  try {
    const userID = await authToken(token);

    const [rows]: any[][] = await mysql.execute(querystr, [userID]);
    body.data = rows.map((row) => {
      let status = Number(row.status);
      if (status === 0) {
        // 订单放映时间已超过当前时间，则订单已完成
        if (
          moment(row.arrangementTime, 'YYYY-MM-DD HH:mm').unix() >
          moment().unix()
        ) {
          status = 1;
        }
      }
      return {
        cinema: row.cinema,
        hall: row.hall,
        orderID: row.orderID,
        selectedSeats: JSON.parse(row.selectedSeats),
        status,
        time: row.time,
        totalPrice: row.totalPrice,
      };
    });
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = String(error);
  } finally {
    ctx.body = body;
  }
};
