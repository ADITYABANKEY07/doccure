import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    myemail: "",
    mypass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error on new attempt

    // 1. Basic Validation
    const isEmailValid = form.myemail.includes("@") && form.myemail.includes(".");
    if (!isEmailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    // 2. Authentication Logic
    const users = JSON.parse(localStorage.getItem("allUsers")) || [];
    const authenticatedUser = users.find(
      (userData) =>
        userData.myemail === form.myemail && userData.mypass === form.mypass
    );

    if (authenticatedUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));
      localStorage.setItem("useremail", authenticatedUser.myemail)
      
      // Using window.location.href forces a refresh, 
      // which is helpful if your Navbar needs to detect the new localStorage state.
      window.location.href = "/";
    } else {
      setError("Invalid email or password.");
    }
  };

  useGSAP(() => {
    (gsap.from(".img", {
      rotateY: 180,
      duration: 2,
      opacity: 0,
      ease: "power3.out",
    }),
      gsap.from(".left", {
        x: -40,
        opacity: 0,
        duration: 2,
        ease: "bounce.out",
      }));
  });

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/formbg.jpg')" }}
    >
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          
          {/* LEFT SIDE – FORM */}
          <div className="left p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-600 mb-6">Login to your account</p>

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4" role="alert">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="myemail"
                type="email"
                value={form.myemail}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />

              <input
                type="password"
                name="mypass"
                value={form.mypass}
                onChange={handleChange}
                placeholder="Enter your  password"
                className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />

              <button
                type="submit"
                className="mt-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Login
              </button>

              <p className="text-sm text-center text-gray-500 mt-3">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                  Signup
                </Link>
              </p>
            </form>
          </div>

          {/* RIGHT SIDE - IMAGE/DECOR (Optional visual balance) */}
          <div className="hidden md:flex items-center bg-white rounded-tr-2xl rounded-br-2xl justify-center p-10">
            <img
              src="/docillustration2.jpg"
              alt="Signup Illustration"
              className="img max-w-sm"
            />
          </div>

        </div> {/* End of Container */}
      </main>
    </div>
  );
};

export default Login;