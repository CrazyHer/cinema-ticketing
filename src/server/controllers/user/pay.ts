import { Context } from 'koa';
import moment from 'moment';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const querystr = `
INSERT INTO orderlist
(
user_id,
arrangement_id,
time,
selected_seats,
total_price,
status)
VALUES
?,
?,
?,
?,
?,
?);
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const data: Models['POST/user/pay']['Req'] = ctx.request.body;
  const body: Models['POST/user/pay']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    const userID = await authToken(token);

    await mysql.execute(querystr, [
      userID,
      data.arrangementID,
      moment().format('YYYY-MM-DD HH:mm'),
      JSON.stringify(data.selectedSeats),
      data.price,
      0,
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
