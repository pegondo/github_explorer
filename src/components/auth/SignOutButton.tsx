"use client";

import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      className="bg-slate-500 px-6 py-2 text-white"
      onClick={() => signOut({ callbackUrl: "/sign-in" })}
      type="button"
    >
      Sign Out of GitHub
    </button>
  );
};

export default SignOutButton;
