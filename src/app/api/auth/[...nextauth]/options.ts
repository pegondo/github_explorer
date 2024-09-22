import type { AuthOptions, Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export interface ExtendedSession extends Session {
  accessToken: string;
}

export const options: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Add the access token to the token.
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }): Promise<ExtendedSession> {
      // Add the access token to the session.
      return { ...session, accessToken: token.accessToken as string };
    },
  },
};
