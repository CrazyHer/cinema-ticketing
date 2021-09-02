import { Context } from 'koa';
import authToken from '../../services/authToken';
import createUser from '../../services/createUser';
import { Models } from '../../utils/rapper';

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const data: Models['POST/admin/addadmin']['Req'] = ctx.request.body;
  const body: Models['POST/admin/addadmin']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    await authToken(token);

    await createUser({
      userID: data.userID,
      password: data.password,
      address: data.address,
      avatar_url: '',
      character: 'admin',
      email: data.email,
      phone: data.phone,
      username: data.username,
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
