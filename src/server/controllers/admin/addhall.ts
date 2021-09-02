import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const queryInsertStr = `
INSERT INTO hall
(name,
seats,
comment,
cinema_id)
VALUES
(?,
?,
?,
?);
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const data: Models['POST/admin/addhall']['Req'] = ctx.request.body;
  const body: Models['POST/admin/addhall']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    const userID = await authToken(token);

    await mysql.execute(queryInsertStr, [
      data.hallName,
      JSON.stringify(data.seats),
      data.comment,
      userID,
    ]);
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = error;
  } finally {
    ctx.body = body;
  }
};
