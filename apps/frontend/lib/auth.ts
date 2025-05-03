import { prisma } from "@repo/db/prisma";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";

export interface session extends Session {
    user: {
      email: string;
      name: string;
      image: string
      uid: string;
    };
}

export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any)
        session: ({ session, token }: any): session => {
            const newSession: session = session as session;
            if (newSession.user && token.uid) {
              newSession.user.uid = token.uid ?? "";
            }
            return newSession!;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token }: any) {
            const user = await prisma.user.findFirst({
                where: {
                    
                }
            })
            if (user) {
              token.uid = user.id
            }
            return token
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async signIn({user, account, profile }: any) {
            if (account?.provider === "google") {
                const email = user.email;
                if(!email) return false;

                const userDb = await prisma.user.findFirst({
                    where: {
                        email: email
                    }
                });
                if(userDb) return true;

                await prisma.user.create({
                    data: {
                        email: email,
                        name: profile?.name,
                        provider: "GOOGLE",
                    }
                });
                return true;
            }
            return false;
        },
    },
}