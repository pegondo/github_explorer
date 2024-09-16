import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import SignInButton from "@/components/auth/SignInButton";

const SignInPage = async () => {
  const session = await getServerSession(options);

  if (session) {
    // If the user is already logged in, redirect him to the profile page.
    redirect("/profile");
  }

  return (
    <div>
      Sign in
      <br />
      <SignInButton />
    </div>
  );
};

export default SignInPage;
