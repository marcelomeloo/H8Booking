import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


/**
 * @swagger
 * /api/rooms:
 *   get:
 *     tags:
 *      - Rooms
 *     summary: Retrieves a list of rooms available for reservation by a user.
 *     description: This endpoint returns all rooms where the user with the given email is allowed to create reservations.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: The email of the user to find rooms for which they can create reservations.
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *      200:
 *       description: Successful response
 */


export async function GET(req: NextRequest): Promise<NextResponse> {
    const email = req.nextUrl.searchParams.get("email");


    if(!email) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }

    const rooms = await prisma.rooms.findMany({ 
        where: {
            userRoomConfig: {
            some: { user: { email }, allowCreateReserve: true}
            }
        }
    });

    return NextResponse.json(
        { rooms },
        { status: 200 }
    );
}