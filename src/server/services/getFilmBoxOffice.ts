import mysql from '../utils/mysql';

const queryStr = `
select sum(orderlist.total_price) as boxOffice, arrangement.IMDb as IMDb
from orderlist, arrangement
where
  orderlist.status = 0 and
  orderlist.arrangement_id = arrangement.arrangement_id
group by IMDb
`;

// 返回以IMDb为key，boxOffice为value的字典
export default async (): Promise<Record<string, number>> => {
  const [rows]: any[][] = await mysql.execute(queryStr);
  const res: Record<string, number> = {};
  for (let i = 0; i < rows.length; i += 1) {
    res[rows[i].IMDb] = rows[i].boxOffice;
  }
  return res;
};
