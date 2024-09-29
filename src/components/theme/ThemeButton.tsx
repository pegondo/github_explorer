"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import SunIcon from "../../../public/icons/sun.jsx";
import MoonIcon from "../../../public/icons/moon.jsx";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  // useTheme returns an undefined theme on the first render, but the server
  // considers it will have a value, so we get a hydration error due to the
  // mismatch.
  // This state fixes it, as the initial value of isClient is false, which
  // makes the server think this component will initially be null, which
  // ends up being the case because both theme and isClient are false in the
  // first render.
  // Source: https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const Icon = theme === "light" ? SunIcon : MoonIcon;

  const toogleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    isClient &&
    theme && (
      <div>
        <Icon
          onClick={toogleTheme}
          className="cursor-pointer hover:animate-bounce"
          alt={theme}
          width={30}
          height={30}
          data-testid="change-theme"
        />
      </div>
    )
  );
};

export default ThemeButton;
