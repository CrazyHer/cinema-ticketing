import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

// 删除电影后，相关的排片也被删除、还没有完成的订单状态设置为已完成1
const queryDeleteFilmStr = `
DELETE FROM film
WHERE IMDb = ?;
`;

const queryDeleteArrangementStr = `
DELETE FROM arrangement
WHERE IMDb = ?;
`;

const queryUpdateOrderlistStr = `
UPDATE orderlist
SET
status = 1
WHERE arrangement_id not in (
  select arrangement_id from arrangement
) and status = 0;
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const { IMDb } = ctx.request.query;
  const body: Models['GET/admin/delfilm']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    await authToken(token);

    if (!IMDb) throw new Error('电影不存在');
    await mysql.execute(queryDeleteFilmStr, [IMDb]);
    await mysql.execute(queryDeleteArrangementStr, [IMDb]);
    await mysql.execute(queryUpdateOrderlistStr, [IMDb]);
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = error;
  } finally {
    ctx.body = body;
  }
};
