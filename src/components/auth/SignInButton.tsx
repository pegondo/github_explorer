"use client";

import { signIn } from "next-auth/react";

const SignInButton = () => {
  const onSignIn = async () =>
    await signIn("github", { callbackUrl: "/profile" });

  return (
    <button
      className="bg-slate-500 px-6 py-2 text-white"
      onClick={onSignIn}
      type="button"
      data-testid="sign-in"
    >
      Sign In With GitHub
    </button>
  );
};

export default SignInButton;
