import { Context } from 'koa';
import authLogin from '../services/authLogin';
import { Models } from '../utils/rapper';
import redis from '../utils/redis';

export default async (ctx: Context) => {
  const data: Models['POST/login']['Req'] = ctx.request.body;
  const body: Models['POST/login']['Res'] = {
    code: -1,
    message: '',
    data: { token: '' },
  };
  try {
    if (await authLogin(data.userID, data.password)) {
      // 生成22位左右的随机token
      const token = `${Math.random().toString(36).substr(2)}${Math.random()
        .toString(36)
        .substr(2)}`;
      // 设置token有效期24小时
      await redis.setex(token, 86400, data.userID);

      body.code = 0;
      body.message = 'success';
      body.data.token = token;
    } else throw new Error('账号不存在或密码不正确！');
  } catch (error) {
    body.code = -1;
    body.message = error;
  } finally {
    ctx.body = body;
  }
};
