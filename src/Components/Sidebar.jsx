import { Heart, Home, Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

/**
 * DesktopSidebar component renders a sidebar for desktop devices with navigation links.
 * It includes a logo, and navigation options like "Home", "Favorites", and "Add Recipe".
 *
 * @returns {JSX.Element} A sidebar with navigation links for desktop screens.
 */
const DesktopSidebar = () => {
  return (
    <div className="p-3 md:p-10 md:w-64 border-r min-h-screen w-24 hidden sm:block">
      <div className="flex flex-col gap-20 sticky top-10 left-0">
        {/* Logo section */}
        <div className="w-full">
          <img src="/logo.jpg" alt="logo" className="hidden md:block" />
          <img
            src="/recipe-book-icon.png"
            alt="logo"
            className="block md:hidden"
          />
        </div>

        {/* Navigation links */}
        <ul className="flex flex-col items-center md:items-start gap-8">
          {/* Home icon with text */}
          <Link to={"/"} className="flex gap-1">
            <Home size={"24"} />
            <span className="font-bold hidden md:block">Home</span>
          </Link>
          {/* Favorites icon with text */}
          <Link to={"/favorites"} className="flex gap-1">
            <Heart size={"24"} />
            <span className="font-bold hidden md:block">Favorites</span>
          </Link>
          {/* Add Recipe icon with text */}
          <Link to={"/addrecipe"} className="flex gap-1">
            <Plus size={"24"} />
            <span className="font-bold hidden md:block">Add Recipe</span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

/**
 * MobileSidebar component renders a bottom navigation bar for mobile devices.
 * It includes navigation icons that are fixed at the bottom of the screen.
 *
 * @returns {JSX.Element} A bottom navigation bar with icons for mobile screens.
 */
const MobileSidebar = () => {
  return (
    <div className="flex justify-center gap-10 border-t fixed w-full bottom-0 left-0 bg-white z-10 p-2 sm:hidden">
      {/* Home navigation link for mobile */}
      <Link to={"/"}>
        <Home size={"24"} className="cursor-pointer" />
      </Link>
      {/* Favorites navigation link for mobile */}
      <Link to={"/favorites"}>
        <Heart size={"24"} className="cursor-pointer" />
      </Link>
      {/* Add Recipe navigation link for mobile */}
      <Link to={"/addrecipe"}>
        <Plus size={"24"} className="cursor-pointer" />
      </Link>
    </div>
  );
};

/**
 * Sidebar component renders both the DesktopSidebar and MobileSidebar
 * components, ensuring a responsive layout.
 *
 * @returns {JSX.Element} The combined DesktopSidebar and MobileSidebar.
 */
const Sidebar = () => {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;
