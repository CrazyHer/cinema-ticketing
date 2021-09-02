import { Context } from 'koa';
import path from 'path';
import authToken from '../../services/authToken';
import updateUser from '../../services/updateUser';
import imageWriter from '../../utils/imageWriter';
import { Models } from '../../utils/rapper';
import { public_dir } from '../../config.json';

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const data: Models['POST/user/editprofile']['Req'] = ctx.request.body;
  const body: Models['POST/user/editprofile']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    const userID = await authToken(token);
    const avatarUrl = path.join(public_dir, 'img', userID);
    if (data.imgSrc) {
      await imageWriter(data.imgSrc, avatarUrl);
    }
    await updateUser({
      address: data.address,
      avatar_url: `public/img/${userID}`,
      email: data.email,
      phone: data.phone,
      userID,
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
