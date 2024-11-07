import React from "react";
import { Link } from "react-router-dom";
import ProfilePopover from "./Popover";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#f83002]">Portal</span>
          </h1>
        </div>
        <div>
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
            {!user ? (
              <div className="flex space-x-4">
                <Link to="/login">
                  <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                    Signup
                  </button>
                </Link>
              </div>
            ) : (
              <ProfilePopover />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
