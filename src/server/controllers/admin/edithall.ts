import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const queryUpdateStr = `
UPDATE hall
SET
name = ?,
seats = ?,
comment = ?
WHERE hall_id = ?
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const data: Models['POST/admin/edithall']['Req'] = ctx.request.body;
  const body: Models['POST/admin/edithall']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    await authToken(token);

    await mysql.execute(queryUpdateStr, [
      data.hallName,
      JSON.stringify(data.seats),
      data.comment,
      data.hallID,
    ]);
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = String(error);
  } finally {
    ctx.body = body;
  }
};
