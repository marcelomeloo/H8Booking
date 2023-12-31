import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { RESERVATION_STATUS } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  const id = Number(context.params.id);
  const { searchParams } = req.nextUrl;
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!id) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }

  if (!startDate || !endDate) {
    return NextResponse.json(
      { message: "Missing startDate or endDate" },
      { status: 422 }
    );
  }

  if (!isISOString(startDate) || !isISOString(endDate)) {
    return NextResponse.json(
      { message: "Dates startDate or endDate is not a valid ISO string" },
      { status: 422 }
    );
  }

  const reservations = await prisma.reservations.findMany({
    where: {
      roomId: id,
      status: RESERVATION_STATUS.APPROVED,
      init_time: { gte: new Date(startDate) },
      end_time: { lte: new Date(endDate) },
    },
  });

  return NextResponse.json({ reservations }, { status: 200 });
}

export type ReservationRequestBodyPOST = {
  userId: number | null;
  initDate: string | null;
  endDate: string | null;
};

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  const body: ReservationRequestBodyPOST = await req.json();

  const userId = body?.userId;
  const roomId = context.params.id;

  if (!userId) {
    return NextResponse.json(
      { message: "Could not find user" },
      { status: 400 }
    );
  }

  const permissions = await prisma.userRoomConfig.findUnique({
    where: { userId_roomId: { userId, roomId: parseInt(context.params.id) } },
  });

  if (!permissions?.allowCreateReserve) {
    return NextResponse.json(
      { message: "User does not have permissions to reserve this room" },
      { status: 403 }
    );
  }

  const initDate = body.initDate;
  const endDate = body.endDate;

  if (!roomId) {
    return NextResponse.json({ message: "Missing room id" }, { status: 422 });
  }

  if (!initDate || !endDate) {
    return NextResponse.json(
      { message: "Missing startDate or endDate" },
      { status: 422 }
    );
  }

  if (!isISOString(initDate) || !isISOString(endDate)) {
    return NextResponse.json(
      { message: "Dates startDate or endDate is not a valid ISO string" },
      { status: 422 }
    );
  }

  const reservation = await prisma.reservations.create({
    data: {
      roomId: parseInt(roomId),
      userId,
      status: RESERVATION_STATUS.APPROVED,
      init_time: new Date(initDate),
      end_time: new Date(endDate),
    },
  });

  return NextResponse.json({ reservation }, { status: 201 });
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: number } }
): Promise<NextResponse> {
  const roomId = context.params.id;
  const body = await req.json();

  const reservationId = body.id;

  if (!roomId || !reservationId) {
    return NextResponse.json(
      { message: "Missing important information" },
      { status: 422 }
    );
  }

  const reservation = await prisma.reservations.update({
    where: { id: Number(reservationId) },
    data: { status: RESERVATION_STATUS.CANCELED },
  });

  return NextResponse.json({ reservation }, { status: 200 });
}

function isISOString(str: string) {
  // Define a regular expression for ISO string format
  const isoStringRegex =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(\.\d{1,3})?)Z?$/;
  return isoStringRegex.test(str);
}
