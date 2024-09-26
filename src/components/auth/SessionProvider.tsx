"use client";

import { SessionProvider as NextSessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

const SessionProvider = ({ children }: Props) => (
  <NextSessionProvider>{children}</NextSessionProvider>
);

export default SessionProvider;
