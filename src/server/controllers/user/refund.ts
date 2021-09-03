import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const querystr = `
UPDATE orderlist
SET
status = 2
WHERE order_id = ?
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
    await mysql.execute(querystr, [orderID]);
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = String(error);
  } finally {
    ctx.body = body;
  }
};
