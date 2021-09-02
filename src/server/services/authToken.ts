import redis from '../utils/redis';

export default async (
  token: string | string[] | undefined
): Promise<string> => {
  if (typeof token === 'string') {
    const email = await redis.get(token);
    if (email) return email;
  }
  throw new Error('登录状态过期，请重新登录');
};
