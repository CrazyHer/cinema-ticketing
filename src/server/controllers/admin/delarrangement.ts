import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const queryDeleteArrangementStr = `
DELETE FROM arrangement
WHERE arrangement_id = ?;
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
  const { arrangementID } = ctx.request.query;
  const body: Models['GET/admin/delarrangement']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    const userID = await authToken(token);

    if (!arrangementID) throw new Error('排片不存在');
    await mysql.execute(queryDeleteArrangementStr, [Number(arrangementID)]);
    await mysql.execute(queryUpdateOrderlistStr);

    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = error;
  } finally {
    ctx.body = body;
  }
};
