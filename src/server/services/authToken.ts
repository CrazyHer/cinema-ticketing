import redis from '../utils/redis';

export default async (
  token: string | string[] | undefined
): Promise<string> => {
  if (typeof token === 'string') {
    const userID = await redis.get(token);
    if (userID) return userID;
  }
  throw new Error('登录状态过期，请重新登录');
};
