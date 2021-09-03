import mysql from '../utils/mysql';
import getFilmBoxOffice from './getFilmBoxOffice';

const queryFilmStr = `
select * from film where IMDb = ?
`;

export default async (
  IMDb: string
): Promise<{
  IMDb: string;
  zh_name: string;
  en_name: string;
  type: string;
  country: string;
  duration: string;
  actor: string;
  boxOffice: number;
  poster_url: string;
  photos_url: string[];
  brief: string;
}> => {
  const [filmRows]: any = await mysql.execute(queryFilmStr, [IMDb]);
  const filmData = filmRows[0];
  const filmBoxOffices = await getFilmBoxOffice();
  const boxOffice = filmBoxOffices[IMDb] || 0;
  if (!filmData) throw new Error('电影信息不存在');
  return {
    ...filmData,
    boxOffice,
    photos_url: JSON.parse(filmData.photos_url),
  };
};
