import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to users.
 *
 * /api/rooms/{id}/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieves users associated with a specific room.
 *     description: This endpoint returns all users that have a configuration set up for a specific room, identified by the room ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the room.
 *         schema:
 *           type: integer
 *     responses:
 *      200:
 *       description: Successful response
 */


export async function GET(req: NextRequest, context: { params: { id: number; } }): Promise<NextResponse> {
    const id = context.params.id;

    if(!id) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }

    const users = await prisma?.users.findMany({
        where: {
            userRoomConfig: {
                some: { roomId: id }
            }
        }
    })

    return NextResponse.json( { users }, { status: 200})
}