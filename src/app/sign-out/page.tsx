import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import SignOutButton from "@/components/auth/SignOutButton";
import Card from "@/components/card/Card";

const SignOutPage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    // If the user isn't logged in, redirect him to the home page.
    redirect("/");
  }

  return (
    <div className="flex justify-center pt-6" data-testid="sign-out-page">
      <div className="w-6/12">
        <Card>
          <div className="flex flex-col justify-center gap-4">
            Sign out
            <br />
            <SignOutButton />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignOutPage;
