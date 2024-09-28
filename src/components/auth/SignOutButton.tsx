"use client";

import { signOut } from "next-auth/react";
import Button from "../button/Button";

const SignOutButton = () => {
  const onSignOut = async () => await signOut({ callbackUrl: "/" });

  return (
    <Button onClick={onSignOut} data-testid="sign-out">
      Sign Out
    </Button>
  );
};

export default SignOutButton;
