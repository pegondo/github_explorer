import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/navigation/Navbar";
import "./styles/globals.css";
import { ThemeProvider } from "next-themes";
import SessionProvider from "@/components/auth/SessionProvider";

export const metadata: Metadata = {
  description: "Simple application to explore GitHub",
  title: "GitHub explorer",
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
