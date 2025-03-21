import React from "react";
import { NavLink } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="w-full p-4 bg-white shadow-md">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
          Market Place
        </h2>

        {/* Search Bar */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Profile Image */}
        <img
          src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Profile"
          className="border rounded-full h-10 w-10 object-cover"
        />
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <ul className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-gray-700 text-sm md:text-base">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
              }
            >
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
              }
            >
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browse"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
              }
            >
              Browse
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sell"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
              }
            >
              Sell
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
