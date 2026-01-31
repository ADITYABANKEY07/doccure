import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  let [error, setError] = useState("");
  let [form, setForm] = useState({
    myname: "",
    myemail: "",
    mypass: "",
    mycnpass: "",
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

    // Validation Email

    let cleanEmail =
      form.myemail.includes("@") && form.myemail.includes(".com");

    let hasNumber = form.mypass.match(/[1234567890]/);
    let hasSymbol = form.mypass.match(/[!@#$%^&*]/);
    let hasUpperCase = form.mypass.match(/[A-Z]/);
    let hasLowerCase = form.mypass.match(/[a-z]/);
    if (form.myname.trim() == "") {
      setError("Please write a valid name");
    } else if (!cleanEmail) {
      setError("Please write a valid email");
    } else if (!(hasNumber && hasSymbol && hasUpperCase && hasLowerCase)) {
      setError("Please write a valid password");
    } else if (form.mypass !== form.mycnpass) {
      setError("Password is not matching");
    }
    // Inside SignUp.jsx -> handleSubmit -> else block
    else {
      setError("");

      // 1. Get existing users from localStorage, or an empty array [] if none exist
      let users = JSON.parse(localStorage.getItem("allUsers")) || [];

      // 2. Check if this email is already registered
      let exists = users.find((u) => u.myemail === form.myemail);

      if (exists) {
        setError("This email is already registered!");
      } else {
        // 3. Add the new user to the array
        users.push(form);

        // 4. Save the updated array back to localStorage
        localStorage.setItem("allUsers", JSON.stringify(users));

        alert("Account created successfully!");
        // REPLACE navigate("/login") WITH THIS:
        window.location.href = "/login";
      }
    }
  };
  return (
    <div
      className="min-h-screen flex flex-col pb-16 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/formbg.jpg')" }}
    >
      {/* Header Section */}
      {/* <header className="w-full h-40 bg-primary flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white tracking-tight">SignUp</h1>
      </header> */}

      {/* Form Section */}
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* LEFT SIDE – FORM */}
          <div className="p-10">
            <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
            <p className="text-gray-500 mb-6">Join us and start your journey</p>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="myname"
                value={form.myname}
                onChange={handleChange}
                placeholder="Full Name"
                className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                name="myemail"
                value={form.myemail}
                onChange={handleChange}
                placeholder="Email"
                className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                type="password"
                name="mypass"
                value={form.mypass}
                onChange={handleChange}
                placeholder="Password"
                className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                type="password"
                name="mycnpass"
                value={form.mycnpass}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
              />

              <button
                type="submit"
                className="mt-3 bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Sign Up
              </button>

              <p className="text-sm text-center text-gray-500 mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold">
                  Log in
                </Link>
              </p>
            </form>
          </div>

          {/* RIGHT SIDE – ILLUSTRATION */}
          <div className="hidden md:flex items-center justify-center p-10">
            {/* <img
        src="/docillustration.jpg"
        alt="Signup Illustration"
        className="max-w-md"
      /> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
