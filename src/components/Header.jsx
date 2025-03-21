import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Redirect to search results page
    }
  };

  return (
    <header className="w-full p-4 bg-white shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Market Place
        </h2>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit">
            <FaMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 cursor-pointer" />
          </button>
        </form>

        {/* Navigation */}
        <nav>
          <ul className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-gray-700 text-sm md:text-base">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold"
                    : "hover:text-blue-500"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold"
                    : "hover:text-blue-500"
                }
              >
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold"
                    : "hover:text-blue-500"
                }
              >
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/browse"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold"
                    : "hover:text-blue-500"
                }
              >
                Browse
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
