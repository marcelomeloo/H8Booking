import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export default async function createReservation(roomId: string, initDate: Date, endDate: Date) {
    const session = await getServerSession();
    const url = `${process.env.BASE_URL}/api/rooms/${roomId}/reservations`;
  
    if (!session?.user?.email) {
      throw new Error('You must be logged in to create a reservation.');
    }
    try {

    const user = await prisma.users.findUnique({
        where: {
          email: session.user.email,
        },
      });

    if (!user) {
        throw new Error('User not found.');
    }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: user.id,
          initDate: initDate.toISOString(),
          endDate: endDate.toISOString(),
        }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json(); // Tentar converter o corpo da resposta para JSON
        console.error(`HTTP error! Status: ${response.status}, Error: ${JSON.stringify(errorResponse)}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('An error occurred:', error);
      throw new Error('An error occurred while processing the reservation.');
    }
  }
  