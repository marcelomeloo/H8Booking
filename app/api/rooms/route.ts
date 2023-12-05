import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const session = await getServerSession();

    if(!session?.user?.email) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }

    const email = session.user.email;
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