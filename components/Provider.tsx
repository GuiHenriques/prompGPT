"use client";
import { ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
    children: ReactNode;
    session?: Session | null | undefined;
}

const Provider = ({children, session}: ProviderProps) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
};

export default Provider;
