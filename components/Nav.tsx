"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut } from "next-auth/react";
import { useSession, getProviders } from "next-auth/react";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react";

interface ProvidersState {
    [key: string]: ClientSafeProvider;
}

const Nav = () => {
    const {data : session} = useSession();

    const [providers, setProviders] = useState({} as ProvidersState | null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        fetchProviders();
    }, []);
    
    return (
        <nav className="w-full flex-between mb-16 pt-3">
            <Link className="flex-center gap-2" href="/">
                <Image
                    src="/images/logo.svg"
                    width={30}
                    height={30}
                    alt="logo"
                    className="object-contain"
                />
                <p className="logo_text">PrompGPT</p>
            </Link>
            {/* Desktop */}
            <div className="sm:flex hidden">
                {session ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button
                            type="button"
                            className="outline_btn"
                            onClick={() => {
                                signOut();
                            }}
                        >
                            Sign Out
                        </button>
                        <Image
                            src={session.user?.image ?? "images/logo.svg"}
                            width={37}
                            height={37}
                            alt="profile"
                            className="rounded-full"
                        ></Image>
                    </div>
                ) : (
                    <div className="flex gap-3 md:gap-5">
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In with {provider.name}
                                </button>
                            ))}
                    </div>
                )}
            </div>
            {/* Mobile */}
            <div className="flex sm:hidden relative">
                {session ? (
                    <div className="flex">
                        <Image
                            src={session.user?.image ?? "images/logo.svg"}
                            width={37}
                            height={37}
                            alt="profile"
                            className="rounded-full"
                            onClick={() => {
                                setToggleDropdown((prevState) => !prevState);
                            }}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                    }}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                    }}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className="mt-5 w-full black-btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex gap-3 md:gap-5">
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In with {provider.name}
                                </button>
                            ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
