import Calendar from "@/components/calendar";
import getWeeklyReservations from "@/lib/getWeeklyReservations";

type WeeklyReservations = {
  id: number,
  init_time: string,
  end_time: string,
  status: string,
  userId: number,
  roomId: number
}

export default async function RoomReservations({ params }: any) {
  const id = String(params.id);

  const weekReservations = await getWeeklyReservations(id, '2023-11-04T00:00:00.000Z');
  console.log(weekReservations);
  return (<></>);
}