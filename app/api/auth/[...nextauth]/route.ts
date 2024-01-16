import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async session({ session }) {

            await connectToDB();
            const sessionUser = await User.findOne({
                email: session.user?.email,
            });
            const activeUserId = sessionUser._id.toString();
            return session;
        },
        
        async signIn({
            profile,
        }: {
            profile?: { email?: string; name?: string; picture?: string };
        }) {
            try {
                await connectToDB();

                // check if user exists
                const userExists = await User.findOne({
                    email: profile?.email,
                });
                
                // if not, create user
                if (!userExists) {
                    User.create({
                        email: profile?.email,
                        username: profile?.name
                            ?.replace(" ", "")
                            .toLowerCase(),
                        image: profile?.picture,
                        
                    });
                }
                return true;

            } catch (error) {
                console.error(error);
                return false;
            }
        },
    },
});

export {handler as GET, handler as POST};
