/* eslint-disable @typescript-eslint/naming-convention */
import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const queryGetSelectedSeatsStr = `
select arrangement_id, selected_seats from orderlist
where order_id = ?
`;

const queryGetArrangementSeatsStr = `
select seats from arrangement where arrangement_id = ? for update
`;

const queryUpdateOrderStr = `
UPDATE orderlist
SET
status = 2
WHERE order_id = ?
`;

const queryUpdateArrangementStr = `
UPDATE arrangement
SET
seats = ?
WHERE arrangement_id = ?
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const { orderID } = ctx.request.query;
  const body: Models['GET/user/refund']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    await authToken(token);

    if (!orderID) throw new Error('订单不存在');

    // 开启事务
    const mysqlconn = await mysql.getConnection();
    try {
      const [selectedSeatsRows]: any = await mysqlconn.execute(
        queryGetSelectedSeatsStr,
        [orderID]
      );
      const arrangementID = selectedSeatsRows[0].arrangement_id as number;
      const selectedSeats = JSON.parse(selectedSeatsRows[0].selected_seats) as {
        row: number;
        line: number;
      }[];

      const [arrangementSeatsRows]: any = await mysqlconn.execute(
        queryGetArrangementSeatsStr,
        [arrangementID]
      );
      const arrangementSeats = JSON.parse(
        arrangementSeatsRows[0].seats
      ) as number[][];

      // 将订单中的对应位置的状态还原为1
      for (let i = 0; i < selectedSeats.length; i += 1) {
        arrangementSeats[selectedSeats[i].row][selectedSeats[i].line] = 1;
      }
      await mysqlconn.execute(queryUpdateArrangementStr, [
        JSON.stringify(arrangementSeats),
        arrangementID,
      ]);
      await mysqlconn.execute(queryUpdateOrderStr, [orderID]);
      await mysqlconn.commit();
    } catch (error) {
      mysqlconn.rollback();
      throw new Error(String(error));
    } finally {
      mysqlconn.release();
    }
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = String(error);
  } finally {
    ctx.body = body;
  }
};
