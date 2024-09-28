import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import SignInButton from "@/components/auth/SignInButton";
import Card from "@/components/card/Card";

const SignInPage = async () => {
  const session = await getServerSession(options);

  if (session) {
    // If the user is already logged in, redirect him to the profile page.
    redirect("/profile");
  }

  return (
    <div className="flex justify-center pt-6" data-testid="sign-in-page">
      <div className="w-6/12">
        <Card>
          <div className="flex flex-col justify-center gap-4">
            Sign in using GitHub
            <br />
            <SignInButton />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
