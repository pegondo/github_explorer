"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Card from "../card/Card";
import Button from "../button/Button";
import { useSession } from "next-auth/react";

const Home = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSeeData = () => {
    router.push("/profile");
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleSeeRepo = () => {
    router.push("/explore");
  };

  useEffect(() => {
    // Pre-fetching the `/explore` page as it's likely that the user
    // will visit it right after and it takes long to load.
    //
    // Note 1: Pre-fetching won't pre-load the images, so `/explore`
    // will still take some time to load, but much less that without
    // the pre-fetching.
    //
    // Note 2: Pre-fetching won't work for dev runs.
    // Source: https://nextjs.org/docs/app/api-reference/components/link#prefetch
    router.prefetch("/explore");
  }, [router]);

  return (
    <div className="p-6" data-testid="home-component">
      <h1 className="text-3xl pb-2">Welcome to GitHub explorer!</h1>
      <p className="text-xl">
        There are two things to do here, you can see your activity in GitHub or
        explore some interesting and wide-used GitHub projects!
      </p>
      <div className="flex flex-col md:flex-row gap-4 pl-2 pr-2 pt-4">
        <Card>
          <div data-testid="home-activity-card">
            <h2 className="text-xl pb-2">Your GitHub activity</h2>
            <p className="pb-2">
              Visualize your GitHub activity since you created your account!
            </p>
            <div className="flex justify-center">
              {session ? (
                <Button
                  onClick={handleSeeData}
                  data-testid="home-profile-button"
                >
                  Go see the data!
                </Button>
              ) : (
                <Button
                  onClick={handleSignIn}
                  data-testid="home-sign-in-button"
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </Card>
        <Card>
          <div data-testid="home-explore-card">
            <h2 className="text-xl pb-2">Explore GitHub</h2>
            <p className="pb-2">
              Looking for a repository to investigate? Check the repository of
              the day in deph!
            </p>
            <div className="flex justify-center">
              <Button onClick={handleSeeRepo} data-testid="home-explore-button">
                Go see the repo!
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
