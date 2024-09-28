"use client";

import { useTheme } from "next-themes";
import React from "react";
import SunIcon from "../../../public/icons/sun.jsx";
import MoonIcon from "../../../public/icons/moon.jsx";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const Icon = theme === "light" ? SunIcon : MoonIcon;

  const toogleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // TODO: Fix this.
  if (!theme) return null;

  // TODO: Improve this animation.
  return (
    <Icon
      onClick={toogleTheme}
      className="cursor-pointer animate-fadein"
      alt={theme}
      width={30}
      height={30}
      data-testid="change-theme"
    />
  );
};

export default ThemeButton;
