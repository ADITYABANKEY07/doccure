import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole, Menu, X, UserRound } from "lucide-react";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex h-20 items-center justify-around">

      <Link to='/'>
                <img
          src="/doccure.png"
          alt="Doccure Logo"
          className="h-10 scale-400 mt-3 object-contain"
        />
      </Link>

        <div className="flex gap-6">
          <Link className="hover:text-blue-500" to="/home">
            Home
          </Link>
          <Link className="hover:text-blue-500" to="/contact">
            Contact
          </Link>
          <Link className="hover:text-blue-500" to="/booking">
            Booking
          </Link>
        </div>

        <div className="flex gap-4 text-white">
          <Link
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-2 rounded-full"
            to="/login"
          >
            <LockKeyhole size={18} /> Login
          </Link>

          <Link
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-2 rounded-full"
            to="/signup"
          >
            <UserRound size={18} /> Signup
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div>
        {/* ✅ FIXED MOBILE TOP BAR */}
        <div className="flex md:hidden h-20 items-center px-5">
          {/* Left Menu Button */}
          <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
            <Menu size={32} />
          </button>

          {/* Center Logo */}
          <div className="flex-1 flex justify-center">
          <Link to='/'>
                        <img
              src="/doccure.png"
              alt="Doccure Logo"
              className="h-10 scale-500 mt-2 object-contain"
            />
          </Link>
          </div>

          {/* Right empty space to keep logo centered */}
          <div className="w-8"></div>
        </div>

        {/* LEFT SLIDE MENU */}
        <div
          className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-6 transform transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mb-6">Menu</h2>

            <button onClick={() => setIsMobileOpen(false)}>
              <X size={32} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <Link onClick={() => setIsMobileOpen(false)} to="/home">
              Home
            </Link>
            <Link onClick={() => setIsMobileOpen(false)} to="/contact">
              Contact
            </Link>
            <Link onClick={() => setIsMobileOpen(false)} to="/booking">
              Booking
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              className="text-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-5 py-2 rounded-full"
              to="/login"
              onClick={() => setIsMobileOpen(false)}
            >
              Login
            </Link>

            <Link
              className="text-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-5 py-2 rounded-full"
              to="/signup"
              onClick={() => setIsMobileOpen(false)}
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
