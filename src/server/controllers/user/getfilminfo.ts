import { Context } from 'koa';
import authToken from '../../services/authToken';
import getFilm from '../../services/getFilm';
import getFilmArrangements from '../../services/getFilmArrangements';
import { Models } from '../../utils/rapper';

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const data = ctx.request.query as Models['GET/user/getfilminfo']['Req'];
  const body: Models['GET/user/getfilminfo']['Res'] = {
    code: -1,
    message: '',
    data: {
      arrangements: [],
      zhName: '',
      enName: '',
      type: '',
      country: '',
      duration: '',
      IMDb: '',
      actor: '',
      boxOffice: 0,
      posterURL: '',
      photosURL: [],
      breif: '',
    },
  };
  try {
    await authToken(token);
    const filmData = await getFilm(data.IMDb);
    const arrangements = await getFilmArrangements(data.IMDb);
    body.data = {
      zhName: filmData.zh_name,
      enName: filmData.en_name,
      arrangements,
      type: filmData.type,
      country: filmData.country,
      duration: filmData.duration,
      IMDb: filmData.IMDb,
      actor: filmData.actor,
      boxOffice: filmData.boxOffice,
      posterURL: filmData.poster_url,
      photosURL: filmData.photos_url,
      breif: filmData.brief,
    };
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = error;
  } finally {
    ctx.body = body;
  }
};
