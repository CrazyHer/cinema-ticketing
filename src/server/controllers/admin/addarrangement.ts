import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

const querySeatsStr = `
select seats from hall where hall_id = ?
`;

const queryInsertStr = `
INSERT INTO arrangement
(IMDb,
hall_id,
time,
seats,
price)
VALUES
(?,
?,
?,
?,
?);
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const data: Models['POST/admin/addarrangement']['Req'] = ctx.request.body;
  const body: Models['POST/admin/addarrangement']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    const userID = await authToken(token);

    const [seatRows]: any = await mysql.execute(querySeatsStr, [data.hallID]);
    if (!seatRows[0]) throw new Error('放映厅不存在');

    await mysql.execute(queryInsertStr, [
      data.IMDb,
      data.hallID,
      data.time,
      seatRows[0].seats,
      data.price,
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
