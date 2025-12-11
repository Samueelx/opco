import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="shadow-md sticky top-0 l-0 w-full bg-white">
      <div className="max-w-[1440px] mx-auto py-10 px-6 flex items-center justify-between">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="w-24" />
        </Link>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <ProfileDropdown />
            ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
