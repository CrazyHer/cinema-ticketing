import { Context } from 'koa';
import createUser from '../services/createUser';
import { Models } from '../utils/rapper';

export default async (ctx: Context) => {
  const data: Models['POST/register']['Req'] = ctx.request.body;
  const body: Models['POST/register']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    await createUser({
      userID: data.userID,
      password: data.password,
      address: [],
      avatar_url: '',
      character: 'user',
      email: '',
      phone: '',
      username: `用户${data.userID}`,
    });
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = error;
  } finally {
    ctx.body = body;
  }
};
