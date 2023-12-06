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