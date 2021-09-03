import mysql from '../utils/mysql';

const querystr = `
INSERT INTO user
(user_id,
password,
\`character\`,
username,
avatar_url,
phone,
email,
address)
VALUES
(?,
?,
?,
?,
?,
?,
?,
?);`;

export default async (userInfo: {
  userID: string;
  password: string;
  character: 'admin' | 'user';
  username: string;
  avatar_url: string;
  phone: string;
  email: string;
  address: string[];
}) => {
  const [row]: any = await mysql.execute(
    'select user_id from user where user_id = ?',
    [userInfo.userID]
  );
  if (row[0]) throw new Error('用户已存在');
  if (!userInfo.address[0]) userInfo.address = ['山东', '济南'];
  await mysql.execute(querystr, [
    userInfo.userID,
    userInfo.password,
    userInfo.character,
    userInfo.username,
    userInfo.avatar_url,
    userInfo.phone,
    userInfo.email,
    JSON.stringify(userInfo.address),
  ]);
};
