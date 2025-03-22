import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../database/firebaseConfig"; // Adjust the import path

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false); // Track user's sign-in state
  const navigate = useNavigate();
  const auth = getAuth(app);

  // Check if the user is signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user); // Set isSignedIn to true if user is logged in
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [auth]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Redirect to search results page
      setSearchQuery("");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to home page after sign-out
    } catch (error) {
      console.error("Error signing out:", error.message);
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
              {isSignedIn ? (
                <button
                  onClick={handleSignOut}
                  className="hover:text-blue-500 focus:outline-none"
                >
                  Sign Out
                </button>
              ) : (
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
              )}
            </li>
            {!isSignedIn && (
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
            )}
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
            {isSignedIn && (
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-semibold"
                      : "hover:text-blue-500"
                  }
                >
                  Profile
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
