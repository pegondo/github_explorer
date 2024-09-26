"use client";

import React from "react";
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
          <li data-testid="li-explore">
            <Link href="/explore" className="hover:underline">
              Explore
            </Link>
          </li>
          {!session ? (
            <li className="ml-auto" data-testid="li-sign-in">
              <Link href="/sign-in" className="hover:underline">
                Sign In
              </Link>
            </li>
          ) : (
            <>
              <li data-testid="li-profile">
                <Link href="/profile" className="hover:underline">
                  Profile
                </Link>
              </li>
              <li className="ml-auto" data-testid="li-sign-out">
                <Link href="/sign-out" className="hover:underline">
                  Sign Out
                </Link>
              </li>
            </>
          )}
          <li className="ml-auto" data-testid="li-theme">
            <ThemeButton />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
