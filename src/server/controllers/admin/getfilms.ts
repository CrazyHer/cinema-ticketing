import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const queryStr = `
with filmboxoffice as (
  select sum(orderlist.total_price) as boxOffice, arrangement.IMDb as IMDb
  from orderlist, arrangement
  where
  orderlist.status = 0 and
  orderlist.arrangement_id = arrangement.arrangement_id
  group by IMDb
)
select * from film natural join filmboxoffice
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const body: Models['GET/admin/getfilms']['Res'] = {
    code: -1,
    message: '',
    data: [],
  };
  try {
    const userID = await authToken(token);

    const [filmRows]: any[][] = await mysql.execute(queryStr);
    body.data = filmRows.map((filmData) => ({
      zhName: filmData.zh_name,
      enName: filmData.en_name,
      type: filmData.type,
      country: filmData.country,
      duration: filmData.duration,
      IMDb: filmData.IMDb,
      actor: filmData.actor,
      boxOffice: filmData.boxOffice,
      posterURL: filmData.poster_url,
      photosURL: filmData.photos_url,
      breif: filmData.brief,
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
