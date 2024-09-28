"use client";

import { signIn } from "next-auth/react";
import Button from "../button/Button";

const SignInButton = () => {
  const onSignIn = async () =>
    await signIn("github", { callbackUrl: "/profile" });

  return (
    <Button onClick={onSignIn} data-testid="sign-in">
      Sign In using GitHub
    </Button>
  );
};

export default SignInButton;
