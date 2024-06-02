import getAllRooms from '@/lib/getAllRooms';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Permissions() {
  const session = await getServerSession();
  const email = session?.user?.email;

  const roomsToManage = await getAllRooms(email ?? '');

  return (
    // Generate lined cards for each room that the user has permissions to manage
    // Make a title for the section
    <div className="flex flex-col items-center justify-center h-screen w-full overflow-hidden">
      <h1 className="text-2xl font-semibold mb-4">Choose a room to manage its permissions</h1>
      <div className="flex flex-row space-x-4">
        {roomsToManage.map((room) => (
          <Link key={room.id} href={`/permissions/rooms/${room.id}`}>
            <div className="flex-shrink-0 w-64 p-4 bg-white border rounded-md hover:shadow-md transition duration-300">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-center">{room.name}</h2>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}