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
            const sessionUser = await User.findOne({
                email: session.user?.email,
            });
            // console.log("sessionUser", sessionUser)
            // console.log("session", session)
            const activeUserId = sessionUser._id.toString(); // export active user id separately
            return session;
        },
        
        async signIn({
            profile,
        }: {
            profile?: { email?: string; name?: string; picture?: string };
        }) {
            // console.log("profile", profile);
            try {
                await connectToDB();

                // check if user exists
                const userExists = await User.findOne({
                    email: profile?.email,
                });
                
                // console.log("userExists", userExists);
                
                // if not, create user
                if (!userExists) {
                    User.create({
                        email: profile?.email,
                        username: profile?.name
                            ?.replace(" ", "")
                            .toLowerCase(),
                        image: profile?.picture,
                        
                    });
                    console.log("user created");
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
