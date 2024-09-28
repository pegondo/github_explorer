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

  if (!theme) return null;

  return (
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
  );
};

export default ThemeButton;
