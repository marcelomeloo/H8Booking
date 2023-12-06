export default async function getAllRooms() {
    const res = await fetch('http://localhost:3000/api/rooms')
    const data = await res.json()
    return data
}