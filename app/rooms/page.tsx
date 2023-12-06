import Link from 'next/link';
import getAllRooms from "@/lib/getAllRooms";
import { getServerSession } from "next-auth";

type AvailableRooms = {
  id: number;
  name: string;
  capacity: number;
  description: string;
  timeSlot: number;
};

export default async function Rooms() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const availableRooms = await getAllRooms(email ?? '');

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full overflow-hidden">
      <div className="flex flex-row space-x-4">
        {availableRooms.map((room: AvailableRooms) => (
          <Link key={room.id} href={`/rooms/${room.id}/reservations`}>
            <div className="flex-shrink-0 w-64 p-4 bg-white border rounded-md hover:shadow-md transition duration-300">
              <div>
                <h2 className="text-lg font-semibold mb-2">{room.name}</h2>
                <p className="text-gray-600">{room.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
