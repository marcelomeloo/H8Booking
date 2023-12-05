import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const session = await getServerSession();

    if(!session?.user?.email) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }

    const email = session.user.email;
    const id = await prisma.users.findUnique({
        where: { email },
        select: { id: true}
    });
    const reservations = await prisma.reservations.findMany({ 
        where: {
            userId: id?.id
        }
    });

    return NextResponse.json(
        { reservations },
        { status: 200 }
    );
}