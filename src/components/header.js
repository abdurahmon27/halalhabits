import React from "react";
import DarkModeToggle from "./darkModeToggle";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="relative w-full h-[80px] bg-transparent flex items-center justify-between p-4 shadow bg-white dark:bg-slate-500">
      <span className="logo text-gray-500 dark:text-white">BrandLogo</span>
      <div className="flex items-center justify-center">
        <DarkModeToggle />
        <button className="dark:text-white mx-4 text-gray-500">
          <Link to="/Login">Login</Link>
        </button>
        <button className="dark:text-white mx-4 text-gray-500">
          <Link to="/signup">Register</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
