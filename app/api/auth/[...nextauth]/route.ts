import {v4 as uuidv4} from 'uuid';
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isITAStudentDomain = user.email?.endsWith("@ga.ita.br");
      if (isITAStudentDomain) return true;
      else return false;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (account?.provider === "google") {
        const name = user.name;
        const userEmail = user.email;
        if (!userEmail || !name) return; // If there's no email, do not sign in.

        // The end of email should be @ga.ita.br
        if (!userEmail.endsWith("@ga.ita.br")) {
          throw new Error("Invalid email domain");
        }
        // Check if the user exists in your database
        const existingUser = await prisma.users.findUnique({
          where: {
            email: userEmail,
          },
        });
        // If the user does not exist and you want to allow automatic registration
        if (!existingUser) {
          // Create a new user in your database
          await prisma.users
            .create({
              data: {
                name,
                email: userEmail,
                role: "MINIMAL",
                password: await hash(uuidv4(), 10), //TODO: retirar isso
              },
            })
            .catch((error) => {
              console.log({ error });
              throw new Error("Error while creating user");
            });
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
