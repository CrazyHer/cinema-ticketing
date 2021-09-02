import mysql from '../utils/mysql';

const queryFilmStr = `
'select * from film where IMDb = ?'
`;
const queryBoxOfficeStr = `
select sum(orderlist.total_price) as boxOffice
from orderlist, arrangement
where
  orderlist.status = 0 and
  orderlist.arrangement_id = arrangement.arrangement_id and
  arrangement.IMDb = ?
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
  const [boxOfficeRows]: any = await mysql.execute(queryBoxOfficeStr, [IMDb]);
  const boxOffice = Number(boxOfficeRows[0].boxOffice);
  if (!filmData) throw new Error('电影信息不存在');
  return {
    ...filmData,
    boxOffice,
    photos_url: JSON.parse(filmData.photos_url),
  };
};
