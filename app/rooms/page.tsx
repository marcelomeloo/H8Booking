import Link from 'next/link';
import getAllRooms from "@/lib/getAllRooms";
import { getServerSession } from "next-auth";

export default async function Rooms() {
  const session = await getServerSession();
  const email = session?.user?.email;

  const availableRooms = await getAllRooms(email ?? '');

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full overflow-hidden">
      <div className="flex flex-row space-x-4">
        {availableRooms.map((room) => (
          <Link key={room.id} href={`/rooms/${room.id}/reservations?email=${email}`}>
            <div className="flex-shrink-0 w-64 h-60 min-h-60 p-4 bg-white border rounded-md hover:shadow-md transition duration-300">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-center">{room.name}</h2>
                </div>
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-600 text-center">{room.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
