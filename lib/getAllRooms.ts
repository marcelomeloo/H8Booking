export type Room = {
  id: number;
  name: string;
  capacity: number;
  description: string;
  timeSlot: number;
};

export default async function getAllRooms(email: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/rooms?email=${email}`
  ).catch((e) => {
    throw new Error(e);
  });
  const data = await res.json();
  return data.rooms as Room[];
}
