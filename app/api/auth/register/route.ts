import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, password } = await req.json();
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
        name: "MARCEL VERSIANI",
        email,
        role: "PROGRAMMER",
        password: await hash(password, 10),
      },
    });
  
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
