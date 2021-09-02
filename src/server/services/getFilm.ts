import mysql from '../utils/mysql';

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
  const [rows]: any = await mysql.execute('select * from film where IMDb = ?', [
    IMDb,
  ]);
  const filmData = rows[0];
  if (!filmData) throw new Error('电影信息不存在');
  return {
    ...filmData,
    boxOffice: Number(filmData.boxOffice),
    photos_url: JSON.parse(filmData.photos_url),
  };
};
