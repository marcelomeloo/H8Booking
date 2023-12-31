import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, context: { params: { id: number; } }): Promise<NextResponse> {
    const id = context.params.id;

    if(!id) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }

    const users = await prisma?.users.findMany({
        where: {
            userRoomConfig: {
                some: { roomId: id }
            }
        }
    })

    return NextResponse.json( { users }, { status: 200})
}