import { Context } from 'koa';
import { servername } from '../../config.json';
import authToken from '../../services/authToken';
import { Models } from '../../utils/rapper';
import cities from '../../resources/cities.json';
import mysql from '../../utils/mysql';

const querystr = `
select * from user where user_id = ?
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const body: Models['GET/user/getuserinfo']['Res'] = {
    code: -1,
    message: '',
    data: {
      character: '',
      username: '',
      avatarURL: '',
      phone: '',
      email: '',
      address: [],
      availableCities: [],
    },
  };

  try {
    const userID = await authToken(token);

    const [rows]: any = await mysql.execute(querystr, [userID]);
    const userData = rows[0];
    if (!userData) throw new Error('用户不存在');

    body.data = {
      character: userData.character,
      username: userData.username,
      avatarURL: `${servername}/${userData.avatar_url}`,
      phone: userData.phone,
      email: userData.email,
      address: JSON.parse(userData.address),
      availableCities: cities,
    };
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = String(error);
  } finally {
    ctx.body = body;
  }
};
