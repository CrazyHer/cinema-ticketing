import mysql from '../utils/mysql';

const querystr = `
INSERT INTO filmticketing.user
(user_id,
password,
character,
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
    'select userID from user where userID = ?',
    [userInfo.userID]
  );
  if (row[0]) throw new Error('用户已存在');
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
