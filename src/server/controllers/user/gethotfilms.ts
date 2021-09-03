import { Context } from 'koa';
import authToken from '../../services/authToken';
import getFilmBoxOffice from '../../services/getFilmBoxOffice';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const querystr = `
select * from film
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
    const filmBoxOffices = await getFilmBoxOffice();
    body.data = rows
      .map((v) => ({
        IMDb: v.IMDb,
        name: v.zh_name,
        popularity: filmBoxOffices[v.IMDb] || 0,
        posterURL: v.poster_url,
      }))
      .sort((a, b) => a.popularity - b.popularity);
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = String(error);
  } finally {
    ctx.body = body;
  }
};
