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
    <div className="flex items-center justify-center h-screen w-full overflow-hidden">
      <table className="min-w-full bg-white border rounded-md overflow-hidden text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Room Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Reservation Date</th>
          </tr>
        </thead>
        <tbody>
          {userReservations.filter(r => r.init_time > new Date().toISOString()).map((reservation: UserReservations) => (
            <tr key={reservation.id}>
              <td className="py-2 px-4 border-b">{reservation.room.name}</td>
              <td className="py-2 px-4 border-b">{reservation.room.description}</td>
              <td className="py-2 px-4 border-b">{reservation.init_time.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
