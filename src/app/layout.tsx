import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/navigation/Navbar";
import "./styles/globals.css";
import { ThemeProvider } from "next-themes";
import SessionProvider from "@/components/auth/SessionProvider";

export const metadata: Metadata = {
  description: "Simple user management application for a technical test",
  title: "Technical Test",
};

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className="text-typography bg-background ">
        <SessionProvider>
          <ThemeProvider defaultTheme="light">
            <Navbar />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
