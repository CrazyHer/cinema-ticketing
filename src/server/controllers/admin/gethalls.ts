import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const queryStr = `
select * from hall where cinema_id = ?
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const body: Models['GET/admin/gethalls']['Res'] = {
    code: -1,
    message: '',
    data: [],
  };
  try {
    const userID = await authToken(token);

    const [rows]: any[][] = await mysql.execute(queryStr, [userID]);
    body.data = rows.map((v) => ({
      hallID: v.hall_id,
      hallName: v.name,
      seats: JSON.parse(v.seats),
      comment: v.comment,
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
