import { Context } from 'koa';
import path from 'path';
import fs from 'fs';
import authToken from '../../services/authToken';
import mysql from '../../utils/mysql';
import { Models } from '../../utils/rapper';
import { public_dir } from '../../config.json';
import imageWriter from '../../utils/imageWriter';

const queryStr = `
UPDATE film
SET
zh_name = ?,
en_name = ?,
type = ?,
country = ?,
duration = ?,
actor = ?,
poster_url = ?,
photos_url = ?,
brief = ?
WHERE IMDb = ?;
`;

export default async (ctx: Context) => {
  const { token } = ctx.request.header;
  const data: Models['POST/admin/editfilm']['Req'] = ctx.request.body;
  const body: Models['POST/admin/editfilm']['Res'] = {
    code: -1,
    message: '',
  };
  try {
    const userID = await authToken(token);

    // 剧照和电影海报按IMDb放入对应文件夹
    const posterURL = `public/poster/${data.IMDb}`;
    await imageWriter(
      data.posterURL,
      path.join(public_dir, 'poster', data.IMDb)
    );

    if (!fs.existsSync(path.join(public_dir, 'photos', data.IMDb)))
      fs.mkdirSync(path.join(public_dir, 'photos', data.IMDb), {
        recursive: true,
      });
    const photosURL: string[] = [];
    for (let i = 0; i < data.photosURL.length; i += 1) {
      // 判断是否为base64，如果是，写为文件，否则直接存储在数据库中不改变
      if (data.photosURL[i].length > 100) {
        // eslint-disable-next-line no-await-in-loop
        await imageWriter(
          data.photosURL[i],
          path.join(public_dir, 'photos', data.IMDb, `${i}`)
        );
        photosURL.push(`public/photos/${data.IMDb}/${i}`);
      } else {
        photosURL.push(`${data.photosURL[i]}`);
      }
    }

    await mysql.execute(queryStr, [
      data.zhName,
      data.enName,
      data.type,
      data.country,
      data.duration,
      data.actor,
      posterURL,
      JSON.stringify(photosURL),
      data.breif,
      data.IMDb,
    ]);
    body.code = 0;
    body.message = 'success';
  } catch (error) {
    body.code = -1;
    body.message = error;
  } finally {
    ctx.body = body;
  }
};
