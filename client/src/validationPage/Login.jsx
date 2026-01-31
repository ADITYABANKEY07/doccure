import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Login = () => {
  let [error, setError] = useState("");
  let [form, setForm] = useState({
    myemail: "",
    mypass: "",
  });

  let handleChange = (e) => {
    let { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let cleanEmail =
      form.myemail.includes("@") && form.myemail.includes(".com");
    let hasNumber = form.mypass.match(/[1234567890]/);
    let hasSymbol = form.mypass.match(/[!@#$%^&*]/);
    let hasUpperCase = form.mypass.match(/[A-Z]/);
    let hasLowerCase = form.mypass.match(/[a-z]/);
    if (cleanEmail == "") {
      setError("Please write a valid email");
    } else if (!(hasNumber && hasSymbol && hasUpperCase && hasLowerCase)) {
      setError("Please write a valid password");
    }

    // 1. Get the array of all users
    let users = JSON.parse(localStorage.getItem("allUsers")) || [];

    // 2. Try to find a user that matches BOTH email and password
    let authenticatedUser = users.find(
      (userData) =>
        userData.myemail === form.myemail && userData.mypass === form.mypass,
    );

    // Inside Login.jsx success block
    if (authenticatedUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));

      // Use this instead of navigate('/')
      window.location.href = "/";
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
        {/* Removed overflow-hidden from the container to ensure content is accessible */}
        <div className="w-full max-w-6xl items-center grid grid-cols-1 md:grid-cols-2 bg-white/50 backdrop-blur-sm rounded-2xl shadow-2xl">
          {/* LEFT SIDE – FORM */}
          <div className="left p-10">
            <h2 className="text-3xl font-bold mb-2 text-black">
              Login Your Account
            </h2>
            {/* <p className="text-gray-500 mb-6">Join us and start your journey</p> */}

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 role='alert'">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">

              <input
                name="myemail"
                value={form.myemail}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="border rounded-md px-4 py-3 focus:ring-3 focus:ring-blue-500 outline-none transition-all"
              />

              <input
                type="password"
                name="mypass"
                value={form.mypass}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border rounded-md px-4 py-3 focus:ring-3 focus:ring-blue-500 outline-none transition-all"
              />

              <button
                type="submit"
                className="mt-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Login
              </button>

              <p className="text-sm text-center text-gray-500 mt-3">
                Don't have an account? 
                <Link
                  to="/signup"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Signup
                </Link>
              </p>
            </form>
          </div>

          {/* RIGHT SIDE – ILLUSTRATION SPACE */}
          <div className="hidden md:flex items-center bg-white rounded-tr-2xl rounded-br-2xl justify-center p-10">
            <img
              src="/docillustration2.jpg"
              alt="Signup Illustration"
              className="img max-w-sm "
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
