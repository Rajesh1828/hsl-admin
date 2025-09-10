import React from "react";
import logo  from "../assets/logo.png"  

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200">
      <img src={logo} className="h-12" alt="" />
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
