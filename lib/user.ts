import prisma from "@/lib/prisma";

export async function findUserByEmail(email: string) {
  return await prisma.users.findUnique({
    where: {
      email,
    },
  });
}
