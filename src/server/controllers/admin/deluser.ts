import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

// 删除用户并删除该用户名下的所有订单
const queryDeleteUserStr = `
delete from user where user_id = ?
`;

const queryDeleteOrderStr = `
delete from orderlist where user_id = ?
`;
export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const data: Models['GET/admin/deluser']['Req'] = ctx.request.body;
  const body: Models['GET/admin/deluser']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    await authToken(token);

    await mysql.execute(queryDeleteUserStr, [data.userID]);
    await mysql.execute(queryDeleteOrderStr, [data.userID]);
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = error;
  } finally {
    ctx.body = body;
  }
};
