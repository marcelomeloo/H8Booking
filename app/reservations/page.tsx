import Link from 'next/link';
import { getServerSession } from 'next-auth';
import getUserReservations from '@/lib/getUserReservations';

type UserReservations = {
  id: number;
  roomId: number;
  init_time: string;
  end_time: string;
  userId: number;
  room: {
    name: string;
    description: string;
    capacity: number;
  };
};

export default async function UserReservations() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const string = await getUserReservations(email ?? '');

  const userReservations: UserReservations[] = JSON.parse(string).reservations;

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full overflow-hidden">
      <div className="flex flex-wrap gap-4">
        {userReservations.filter(r => r.init_time > new Date().toISOString()).map((reservation: UserReservations) => (
          <Link key={reservation.id} href={`/reservation/${reservation.id}`}>
            <div className="flex-shrink-0 w-64 h-60 min-h-60 p-4 bg-white border rounded-md hover:shadow-md transition duration-300 block">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-center">{reservation.room.name}</h2>
                  <p className="text-gray-600 text-center">{reservation.room.description}</p>
                </div>
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-600 text-center">{reservation.init_time.slice(0, 10)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
