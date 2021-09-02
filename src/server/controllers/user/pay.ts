import { Context } from 'koa';
import moment from 'moment';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

// 为座位加锁
const querySeatStr = `
select seats from arrangement where arrangement_id = ? for update
`;

const queryUpdateSeatStr = `
UPDATE arrangement
SET
seats = ?,
WHERE arrangement_id = ?;
`;

const queryInsertOrderStr = `
INSERT INTO orderlist
(
user_id,
arrangement_id,
time,
selected_seats,
total_price,
status)
VALUES
?,
?,
?,
?,
?,
?);
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const data: Models['POST/user/pay']['Req'] = ctx.request.body;
  const body: Models['POST/user/pay']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    const userID = await authToken(token);
    const mysqlcon = await mysql.getConnection();
    try {
      // 开始事务
      await mysqlcon.beginTransaction();
      // 查询座位情况并加锁
      const [seatRows]: any = await mysqlcon.execute(querySeatStr, [
        data.arrangementID,
      ]);
      const seats: number[][] = JSON.parse(seatRows[0].seats);

      // 检查所选座位是否被占用
      for (let i = 0; i < data.selectedSeats.length; i += 1) {
        const { row, line } = data.selectedSeats[i];
        if (seats[row][line] !== 1) {
          throw new Error('所选座位已被占用!');
        }
        seats[row][line] = 2;
      }

      // 更新座位
      await mysqlcon.execute(queryUpdateSeatStr, [
        JSON.stringify(seats),
        data.arrangementID,
      ]);

      // 提交订单
      await mysqlcon.execute(queryInsertOrderStr, [
        userID,
        data.arrangementID,
        moment().format('YYYY-MM-DD HH:mm'),
        JSON.stringify(data.selectedSeats),
        data.price,
        0,
      ]);

      // 结束事务
      await mysqlcon.commit();
    } catch (error) {
      await mysqlcon.rollback();
      throw error;
    } finally {
      mysqlcon.release();
    }

    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = error;
  } finally {
    ctx.body = body;
  }
};
