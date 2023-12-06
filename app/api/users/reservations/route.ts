import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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