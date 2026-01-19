import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Menu, X, UserRound, LogOut, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // 1. Get Login Data
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // 2. Logout Logic
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsProfileOpen(false);
    window.location.href = "/login"; // Force reload to reset App.js routes
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm font-sans">
      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex h-20 items-center justify-around">
        <Link to="/">
          <img src="/doccure.png" alt="Doccure Logo" className="h-10 scale-450 object-contain" />
        </Link>

        <div className="flex gap-8 font-medium text-gray-700">
          <Link className="hover:text-blue-500 transition" to="/home">Home</Link>
          <Link className="hover:text-blue-500 transition" to="/contact">Contact</Link>
          <Link className="hover:text-blue-500 transition" to="/booking">Booking</Link>
        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition" to="/login">
                <LockKeyhole size={18} /> Login
              </Link>
              <Link className="flex items-center gap-2 bg-slate-800 text-white px-6 py-2 rounded-full shadow-md hover:bg-slate-900 transition" to="/signup">
                <UserRound size={18} /> Signup
              </Link>
            </>
          ) : (
            /* PROFILE DROPDOWN */
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  {user?.myname?.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-700">{user?.myname}</span>
                <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 shadow-xl rounded-2xl p-4 animate-in fade-in zoom-in duration-200">
                  <div className="pb-3 border-b border-gray-100">
                    <p className="text-sm text-gray-400">Signed in as</p>
                    <p className="font-bold text-gray-800 truncate">{user?.myemail}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 text-primary font-semibold hover:bg-blue-50 p-2 mt-2 rounded-lg transition"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="flex md:hidden h-20 items-center px-5 justify-between bg-white">
        <button onClick={() => setIsMobileOpen(true)}>
          <Menu size={32} />
        </button>
        <Link to="/"><img src="/doccure.png" alt="Doccure Logo" className="h-8 scale-450 object-contain" /></Link>
        <div className="w-8"></div>
      </div>

      {/* MOBILE SLIDE MENU */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)}></div>
          <div className="relative w-72 bg-white h-full shadow-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button onClick={() => setIsMobileOpen(false)}><X size={28} /></button>
            </div>

            <div className="flex flex-col gap-5 text-lg font-medium text-gray-600">
              <Link onClick={() => setIsMobileOpen(false)} to="/home">Home</Link>
              <Link onClick={() => setIsMobileOpen(false)} to="/contact">Contact</Link>
              <Link onClick={() => setIsMobileOpen(false)} to="/booking">Booking</Link>
            </div>

            <div className="mt-auto pb-6">
              {isLoggedIn ? (
                <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-400">Account</p>
                    <p className="font-bold text-gray-800 mb-4">{user?.myemail}</p>
                    <button onClick={handleLogout} className="w-full flex justify-center items-center gap-2 bg-primary text-white py-3 rounded-xl font-bold">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link onClick={() => setIsMobileOpen(false)} to="/login" className="text-center bg-blue-500 text-white py-3 rounded-xl font-bold">Login</Link>
                  <Link onClick={() => setIsMobileOpen(false)} to="/signup" className="text-center bg-gray-800 text-white py-3 rounded-xl font-bold">Signup</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;