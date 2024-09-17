"use client";

import { SessionProvider as NextSessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

const SessionProvider = ({ children }: Props) => {
  return <NextSessionProvider>{children}</NextSessionProvider>;
};

export default SessionProvider;
