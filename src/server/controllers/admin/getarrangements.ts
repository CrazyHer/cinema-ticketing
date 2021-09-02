import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const queryStr = `
select
  film.zh_name as filmName,
  hall.name as hall,
  arrangement.time as time,
  arrangement.seats as seats,
  arrangement.price as price,
  arrangement.arrangement_id as arrangementID
from user, hall, arrangement, film
where
  arrangement.IMDb = film.IMDb and
  arrangement.hall_id = hall.hall_id and
  hall.cinema_id = user.user_id and
  user.user_id = ?
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const body: Models['GET/admin/getarrangements']['Res'] = {
    code: -1,
    message: '',
    data: [],
  };
  try {
    const userID = await authToken(token);

    const [rows]: any[][] = await mysql.execute(queryStr, [userID]);

    body.data = rows.map((v) => ({
      filmName: v.filmName,
      hall: v.hall,
      time: v.time,
      seats: JSON.parse(v.seats),
      price: Number(v.price),
      arrangementID: v.arrangementID,
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
