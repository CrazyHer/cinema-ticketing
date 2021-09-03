import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const queryStr = `
select * from user
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const body: Models['GET/admin/getusers']['Res'] = {
    code: -1,
    message: '',
    data: [],
  };
  try {
    await authToken(token);

    const [rows]: any[][] = await mysql.execute(queryStr);
    body.data = rows.map((v) => ({
      userID: v.user_id,
      username: v.username,
      character: v.character,
      address: JSON.parse(v.address),
    }));
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = String(error);
  } finally {
    ctx.body = body;
  }
};
