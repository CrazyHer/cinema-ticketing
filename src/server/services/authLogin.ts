import mysql from '../utils/mysql';

export default async (userID: string, password: string): Promise<boolean> => {
  const [rows]: any = await mysql.execute(
    'select password from user where user_id = ?',
    [userID]
  );
  return rows[0]?.password === password;
};
