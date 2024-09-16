export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/profile", // A user that's not logged in mustn't access the profile page.
  ],
};
