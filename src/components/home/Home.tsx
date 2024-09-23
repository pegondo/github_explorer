"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const router = useRouter();

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
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
