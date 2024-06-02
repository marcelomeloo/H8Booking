import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 * /api/users/{email}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieves user information by user email.
 *     description: This endpoint retrieves information for a given user, identified by their user email.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The unique email of the user.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 role:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */

export type UserGETResponse = {
  id: number;
  name: string;
  role: string;
  email: string;
};


export async function GET(req: NextRequest, context: { params: { email: string } }): Promise<NextResponse> {
    const email = context.params.email;

    if (!email) {
        return NextResponse.json(
            { message: "Bad Request: Missing or invalid user ID" },
            { status: 400 }
        );
    }

    const user = await prisma.users.findUnique({
        where: { email: email },
        select: {
            id: true,
            name: true,
            role: true,
            email: true
        }
    });

    if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { user },
        { status: 200 }
    );
}
