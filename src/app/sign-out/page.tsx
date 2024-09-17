import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import SignOutButton from "@/components/auth/SignOutButton";

const SignOutPage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    // If the user isn't logged in, redirect him to the home page.
    redirect("/");
  }

  return (
    <div>
      Sign out
      <br />
      <SignOutButton />
    </div>
  );
};

export default SignOutPage;
