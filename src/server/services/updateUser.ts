import mysql from '../utils/mysql';

const queryStr = `
UPDATE user
SET
username = ?,
avatar_url = ?,
phone = ?,
email = ?,
address = ?
WHERE user_id = ?;
`;

export default async (userInfo: {
  userID: string;
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
  if (!row[0]) throw new Error('用户不存在');
  await mysql.execute(queryStr, [
    userInfo.username,
    userInfo.avatar_url,
    userInfo.phone,
    userInfo.email,
    JSON.stringify(userInfo.address),
    userInfo.userID,
  ]);
};
