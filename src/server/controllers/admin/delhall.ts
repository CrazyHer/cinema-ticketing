import { Context } from 'koa';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';

// 删除放映厅后，相关的排片也被删除、还没有完成的订单状态设置为已完成1
const queryDeleteHallStr = `
DELETE FROM hall
WHERE hall_id = ?;
`;

const queryDeleteArrangementStr = `
DELETE FROM arrangement
WHERE hall_id = ?;
`;

const queryUpdateOrderlistStr = `
UPDATE orderlist
SET
status = 1
WHERE arrangement_id not in (
  select arrangement_id from arrangement
) and status = 0;
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const data: Models['GET/admin/delhall']['Req'] = ctx.request.body;
  const body: Models['GET/admin/delhall']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    await authToken(token);

    await mysql.execute(queryDeleteHallStr, [data.hallID]);
    await mysql.execute(queryDeleteArrangementStr, [data.hallID]);
    await mysql.execute(queryUpdateOrderlistStr);

    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = String(error);
  } finally {
    ctx.body = body;
  }
};
