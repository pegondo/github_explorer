import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import DisplayGitHubStats from "@/components/github/stats/DisplayGitHubStats";
import Card from "@/components/card/Card";

const ProfilePage = async () => {
  const session = await getServerSession(options);

  return (
    <div className="p-6" data-testid="profile-page">
      <div>
        <h1 className="text-2xl pb-3" data-testid="username">
          Welcome, <span>{session?.user?.name || "unknown user"}</span>
        </h1>
        <Card>
          <p className="text-xl pb-4">
            This is all we know about you &#128540;
          </p>
          <div className="px-10">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <p className="pb-2">
                  <strong>Your name</strong> is {session?.user?.name}
                </p>
                {session?.user?.image ? (
                  <div>
                    <p>
                      Your fancy <strong>profile picture</strong> is
                    </p>
                    <Image
                      src={session.user.image}
                      width={200}
                      height={200}
                      alt={`Profile Pic for ${session?.user?.name}`}
                      priority={true}
                      data-testid="user-image"
                    />
                  </div>
                ) : (
                  <p className="w-6/12" data-testid="no-user-image-message">
                    That you have no <strong>profile picture</strong> &#128517;
                  </p>
                )}
              </div>
              <p>
                <strong>Your email</strong> is {session?.user?.email}
              </p>
            </div>
            <div className="flex justify-center pt-2"></div>
          </div>
        </Card>
        <h1 className="text-2xl pt-6 pb-3">Your interactions</h1>
        <DisplayGitHubStats />
      </div>
    </div>
  );
};

export default ProfilePage;
