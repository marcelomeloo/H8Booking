import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to users.
 *
 * /api/rooms/{id}/users/config:
 * 
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user permissions for a specific room.
 *     description: This endpoint updates the permissions for a user associated with a specific room, identified by the room ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the room.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - allowCreateReserve
 *               - allowCancelReserve
 *               - userId
 *             properties:
 *               allowCreateReserve:
 *                 type: boolean
 *                 description: Whether the user is allowed to create reservations for the room.
 *               allowCancelReserve:
 *                 type: boolean
 *                 description: Whether the user is allowed to cancel reservations for the room.
 *               userId:
 *                 type: integer
 *                 description: The unique identifier of the user.
 *     responses:
 *       201:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */



export async function PUT(req: NextRequest, context: { params: { id: number; } }): Promise<NextResponse> {
    const id = context.params.id;
    const { allowCreateReserve, allowCancelReserve, userId } = await req.json();

    if(!id) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }

    const users = await prisma?.userRoomConfig.upsert({
        where: {
            userId_roomId: {
                userId: Number(userId),
                roomId: Number(id)
            }
        },
        update: {
            allowCreateReserve: Boolean(allowCreateReserve),
            allowCancelReserve: Boolean(allowCancelReserve)
        },
        create: {
            allowCreateReserve: Boolean(allowCreateReserve),
            allowCancelReserve: Boolean(allowCancelReserve),
            userId: Number(userId),
            roomId: Number(id)
        }
    })

    return NextResponse.json({ status: 201})
}