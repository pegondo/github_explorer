"use client";

import React from "react";
import Link from "next/link";
import ThemeButton from "../theme/ThemeButton";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div>
      <nav className="bg-navbar p-4">
        <ul className="flex gap-x-6 items-center text-white">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/explore" className="hover:underline">
              Explore
            </Link>
          </li>
          {!session ? (
            <li className="ml-auto">
              <Link href="/sign-in" className="hover:underline">
                Sign In
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link href="/profile" className="hover:underline">
                  Profile
                </Link>
              </li>
              <li className="ml-auto">
                <Link href="/sign-out" className="hover:underline">
                  Sign Out
                </Link>
              </li>
            </>
          )}
          <li className="ml-auto">
            <ThemeButton />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
