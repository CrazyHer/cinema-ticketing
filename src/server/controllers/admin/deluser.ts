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
  const { userID } = ctx.request.query;
  const body: Models['GET/admin/deluser']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    await authToken(token);
    if (!userID) throw new Error('用户不存在');

    await mysql.execute(queryDeleteUserStr, [userID]);
    await mysql.execute(queryDeleteOrderStr, [userID]);
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = String(error);
  } finally {
    ctx.body = body;
  }
};
