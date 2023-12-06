export default async function getWeeklyReservations(
  id: string,
  startDate: string
) {
  const endDate = new Date(startDate).setDate(
    new Date(startDate).getDate() + 7
  );
  const res = await fetch(
    `${process.env.BASE_URL}/api/rooms/${id}/reservations?startDate=${startDate}&endDate=${new Date(
      endDate
    ).toISOString()}`,
    { cache: "no-store" }
  ).catch((e) => {
    console.log(e);
    throw new Error(e);
  });
  const data = await res.json();
  console.log(data);
  return data.reservations;
}
