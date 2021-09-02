import mysql from '../utils/mysql';

const querystr = `
select
  user.username as cinema,
  hall.name as hall,
  arrangement.time as time,
  arrangement.seats as seats,
  arrangement.price as price,
  arrangement.arrangement_id as arrangementID
from user, hall, arrangement
where
  arrangement.hall_id = hall.hall_id and
  hall.cinema_id = user.user_id
`;

export default async (
  IMDb: string
): Promise<
  {
    cinema: string;
    hall: string;
    time: string;
    seats: number[][];
    price: number;
    arrangementID: number;
  }[]
> => {
  const [rows]: any[][] = await mysql.execute(querystr, [IMDb]);
  return rows.map((row) => ({
    cinema: row.cinema,
    hall: row.hall,
    time: row.time,
    seats: JSON.parse(row.seats),
    price: Number(row.price),
    arrangementID: row.arrangementID,
  }));
};
