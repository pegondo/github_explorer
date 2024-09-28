"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeButton from "../theme/ThemeButton";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div data-testid="navbar">
      <nav className="bg-navbar p-4">
        <ul className="flex gap-x-6 items-center text-white">
          <li data-testid="li-home">
            <Link href="/" className="hover:underline" data-testid="home">
              Home
            </Link>
          </li>
          {session && (
            <li data-testid="li-profile">
              <div className="flex flex-row gap-2">
                <Link href="/profile" className="hover:underline">
                  Profile
                </Link>
                {session?.user?.image && (
                  <Image
                    className="rounded-full"
                    src={session.user.image}
                    width={20}
                    height={20}
                    alt={`Profile Pic for ${session?.user?.name}`}
                    priority={true}
                    data-testid="user-image"
                  />
                )}
              </div>
            </li>
          )}
          <li data-testid="li-explore">
            <Link href="/explore" className="hover:underline">
              Explore
            </Link>
          </li>
          <div className="flex items-center gap-x-6 ml-auto">
            {!session ? (
              <li data-testid="li-sign-in">
                <Link href="/sign-in" className="hover:underline">
                  Sign In
                </Link>
              </li>
            ) : (
              <li data-testid="li-sign-out">
                <Link href="/sign-out" className="hover:underline">
                  Sign Out
                </Link>
              </li>
            )}
            <li data-testid="li-theme">
              <ThemeButton />
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
