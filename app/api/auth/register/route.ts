import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and management
 *
 * /api/users/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Creates a new user with minimal role and sets up user room configuration for all rooms.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the user account
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, password, name } = await req.json();
    const exists = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const user = await prisma.users.create({
      data: {
        name,
        email,
        role: "MINIMAL",
        password: await hash(password, 10),
      },
    });

    const userId = user.id;
    const rooms = await prisma.rooms.findMany();

    const userRoomConfigPromises = rooms.map((room) =>
      prisma.userRoomConfig.create({
        data: {
          allowCreateReserve: false,
          allowCancelReserve: false,
          userId,
          roomId: room.id,
        },
      })
    );

    await Promise.all(userRoomConfigPromises);
  
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
