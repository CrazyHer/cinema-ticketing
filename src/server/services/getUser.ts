import mysql from '../utils/mysql';

export default async (
  userID: string
): Promise<{
  user_id: string;
  password: string;
  character: 'admin' | 'user';
  username: string;
  avatar_url: string;
  phone: string;
  email: string;
  address: string[];
}> => {
  const [rows]: any = await mysql.execute(
    'select * from user where user_id = ?',
    [userID]
  );
  if (!rows[0]) throw new Error('用户不存在');

  return { ...rows[0] };
};
