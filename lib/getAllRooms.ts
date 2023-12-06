export default async function getAllRooms(email: string) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/rooms?email=${email}`
  ).catch((e) => {
    throw new Error(e);
  });
  const data = await res.json();
  return data.rooms;
}
