import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import DisplayGitHubStats from "@/components/github/stats/DisplayGitHubStats";

const ProfilePage = async () => {
  const session = await getServerSession(options);

  return (
    <div>
      <div>
        Name: {session?.user?.name || "unknown"}
        <br />
        Profile image:
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            width={200}
            height={200}
            alt={`Profile Pic for ${session.user.name}`}
            priority={true}
          />
        ) : (
          "no image"
        )}
        <br />
        <DisplayGitHubStats />
      </div>
    </div>
  );
};

export default ProfilePage;
