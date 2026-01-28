import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-15">
      {/* Header Section */}
      <header className="w-full h-40 bg-primary flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white tracking-tight">Login</h1>
      </header>

      {/* Form Section */}
      <main className="flex-grow flex justify-center items-start pt-12 px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-white rounded-xl shadow-lg border border-gray-100 p-8 w-full max-w-md"
        >
          <p className="text-red-500">{error}</p>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Email Address</label>
            <input
              name="myemail"
              value={form.myemail}
              type="text"
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Password</label>
            <input
              name="mypass"
              value={form.mypass}
              type="password"
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md active:transform active:scale-95"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              SignUp
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
