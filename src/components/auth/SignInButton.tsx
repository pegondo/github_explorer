"use client";

import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <button
      className="bg-slate-500 px-6 py-2 text-white"
      onClick={() => signIn("github", { callbackUrl: "/profile" })}
      type="button"
    >
      Sign In With GitHub
    </button>
  );
};

export default SignInButton;
