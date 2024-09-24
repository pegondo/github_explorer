"use client";

import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const onSignOut = async () => await signOut({ callbackUrl: "/" });

  return (
    <button
      className="bg-slate-500 px-6 py-2 text-white"
      onClick={onSignOut}
      type="button"
      data-testid="sign-out"
    >
      Sign Out of GitHub
    </button>
  );
};

export default SignOutButton;
