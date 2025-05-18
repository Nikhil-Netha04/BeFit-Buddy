import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth, useUser, SignInButton, useClerk } from "@clerk/clerk-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get first letter of email for the user icon
  const getUserInitial = () => {
    if (user && user.primaryEmailAddress) {
      return user.primaryEmailAddress.emailAddress.charAt(0).toUpperCase();
    }
    return "?";
  };

  // Handle sign out properly
  const handleSignOut = async () => {
    try {
      await signOut();
      setDropdownOpen(false);
      navigate('/', { replace: true }); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link
          to="/"
          className="text-white text-2xl font-extrabold tracking-wide transform transition duration-300 hover:scale-110"
        >
          Be Active Buddy
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden focus:outline-none text-3xl transition-transform transform hover:rotate-90"
        >
          ☰
        </button>

        {/* Nav Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center space-x-6 absolute md:static bg-indigo-800 md:bg-transparent top-16 left-0 w-full md:w-auto p-4 md:p-0 transition-all duration-500 ease-in-out`}
        >
          <Link
            to="/"
            className="text-white text-lg md:text-xl font-semibold transition duration-300 hover:text-gray-300 hover:scale-110"
          >
            Home
          </Link>
          {isSignedIn && (
            <>
              <Link
                to="/exercise"
                className="text-white text-lg md:text-xl font-semibold transition duration-300 hover:text-gray-300 hover:scale-110"
              >
                Exercise
              </Link>
              {/* <Link
                to="/workout"
                className="text-white text-lg md:text-xl font-semibold transition duration-300 hover:text-gray-300 hover:scale-110"
              >
                Workout
              </Link> */}
            </>
          )}

          {/* User Icon or Sign In Button */}
          <div className="relative" ref={dropdownRef}>
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300">
                  Sign In
                </button>
              </SignInButton>
            ) : (
              <>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center hover:bg-blue-700 transition duration-300"
                >
                  {getUserInitial()}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user?.primaryEmailAddress?.emailAddress || "User"}
                    </div>
                    <button
                      onClick={handleSignOut}  // Simplified the onClick handler
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;