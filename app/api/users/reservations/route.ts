import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 * /api/users/reservations:
 *   get:
 *     tags:
 *     - Reservations
 *     summary: Retrieves a list of reservations by user email.
 *     description: This endpoint retrieves all reservations for a given user, identified by their email.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: The email of the user to retrieve reservations for.
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *      200:
 *       description: Successful response
 *     
 */


export async function GET(req: NextRequest): Promise<NextResponse> {
    const email = req.nextUrl.searchParams.get("email");

    if(!email) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }

    const id = await prisma.users.findUnique({
        where: { email },
        select: { id: true}
    });
    const reservations = await prisma.reservations.findMany({ 
        where: {
            userId: id?.id
        },
        select: {
            id: true,
            roomId: true,
            init_time: true,
            end_time: true,
            userId: true,
            room: {
                select: {
                    name: true,
                    description: true,
                    capacity: true,
                }
            }
        }
    });

    return NextResponse.json(
        { reservations },
        { status: 200 }
    );
}