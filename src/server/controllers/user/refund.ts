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
  const data: Models['GET/user/refund']['Req'] = ctx.request.body;
  const body: Models['GET/user/refund']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    await authToken(token);

    await mysql.execute(querystr, [data.orderID]);
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = error;
  } finally {
    ctx.body = body;
  }
};
