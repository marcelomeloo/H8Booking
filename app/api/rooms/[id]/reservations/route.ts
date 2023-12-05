import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { RESERVATION_STATUS } from "@prisma/client";

export async function GET(req: NextRequest, context: { params: { id: number; } }) {
    const id = context.params.id;

    if(!id) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }

    const reservations = await prisma.reservations.findMany({
        where: {
            roomId: id, 
            status: RESERVATION_STATUS.APPROVED
        }
    })

    return NextResponse.json( { reservations }, { status: 200})
}

export async function POST(req: NextRequest, context: { params: { id: number; } }) {
    const roomId = context.params.id;
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if(!roomId || !userId || !startDate || !endDate) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }

    const reservation = await prisma.reservations.create({
        data: {
            roomId: parseInt(roomId.toString()),
            userId: parseInt(userId),
            status: RESERVATION_STATUS.APPROVED,
            init_time: new Date(startDate),
            end_time: new Date(endDate)
        }
    })

    return NextResponse.json( { reservation }, { status: 200})
}