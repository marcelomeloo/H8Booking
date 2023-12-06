export default async function getAllRooms(id: string, startDate: string) {
    const endDate = new Date(startDate).setDate(new Date(startDate).getDate() + 7);
    const res = await fetch(`http://localhost:3000/api/rooms/${id}/reservations?startDate=${startDate}&endDate=${(new Date(endDate)).toISOString()}`)
    const data = await res.json()
    return data
}