// DarkModeToggle.js

import React, { useState, useEffect } from "react";
import { Switch } from "antd";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex items-center justify-center mx-5 my-auto pt-2">
      <Switch onChange={toggleDarkMode} />
    </div>
  );
};

export default DarkModeToggle;
