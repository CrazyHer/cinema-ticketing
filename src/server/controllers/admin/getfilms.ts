import { Context } from 'koa';
import authToken from '../../services/authToken';
import getFilmBoxOffice from '../../services/getFilmBoxOffice';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';
import { servername } from '../../config.json';

const queryStr = `
select * from film
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const body: Models['GET/admin/getfilms']['Res'] = {
    code: -1,
    message: '',
    data: [],
  };
  try {
    await authToken(token);

    const [filmRows]: any[][] = await mysql.execute(queryStr);
    const filmBoxOffices = await getFilmBoxOffice();
    body.data = filmRows.map((filmData) => ({
      zhName: filmData.zh_name,
      enName: filmData.en_name,
      type: filmData.type,
      country: filmData.country,
      duration: filmData.duration,
      IMDb: filmData.IMDb,
      actor: filmData.actor,
      boxOffice: filmBoxOffices[filmData.IMDb] || 0,
      posterURL: `${servername}/${filmData.poster_url}`,
      photosURL: (JSON.parse(filmData.photos_url) as string[]).map(
        (v) => `${servername}/${v}`
      ),
      breif: filmData.brief,
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
