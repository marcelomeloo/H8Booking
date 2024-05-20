import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/**
 * @swagger
 * /api/rooms/{id}/permissions:
 * get:
 *  tags:
 *   - Rooms
 *  summary: Retrieves a list of users with permissions on a room.
 *  description: This endpoint returns all users with permissions on a room.
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: The id of the room to find permissions for.
 *      schema:
 *        type: integer
 *      responses:
 *        200:
 *          description: Successful response
 *        404:
 *          description: Room not found
 *        500:
 *          description: Internal Server Error
 *
 */

export type RoomPermissionsGETResponse = {
  roomName: string;
  permissions: Prisma.RoomsGetPayload<{
    select: {
      name: true;
      userRoomConfig: {
        include: {
          user: true;
        };
      };
    };
  }>["userRoomConfig"];
};

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  const id = Number(context.params.id);

  if (!id) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }

  const room = await prisma.rooms.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      userRoomConfig: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!room) {
    return NextResponse.json({ message: "Room not found" }, { status: 404 });
  }

  return NextResponse.json(
    { permissions: room.userRoomConfig, roomName: room.name },
    { status: 200 }
  );
}
