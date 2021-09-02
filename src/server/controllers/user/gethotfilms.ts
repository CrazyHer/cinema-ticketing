import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const querystr = `
select * from film order by boxOffice desc
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const body: Models['GET/user/gethotfilms']['Res'] = {
    code: -1,
    message: '',
    data: [],
  };
  try {
    await authToken(token);

    const [rows]: any[][] = await mysql.execute(querystr);
    body.data = rows.map((v) => ({
      IMDb: v.IMDb,
      name: v.zh_name,
      popularity: v.boxOffice,
      posterURL: v.poster_url,
    }));
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = error;
  } finally {
    ctx.body = body;
  }
};
