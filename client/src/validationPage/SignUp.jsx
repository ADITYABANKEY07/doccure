import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  let [error, setError] = useState("");
  let [form, setForm] = useState({
    myname: "",
    myemail: "",
    myphoneno:"",
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
    let phone = form.myphoneno.trim()
    let isOnlyDigits = /^[0-9]+$/.test(phone);

    if (form.myname.trim() == "") {
      setError("Please write a valid name");
    } else if (cleanEmail == "") {
      setError("Please write a valid email");
    }
    else if (!(hasNumber && hasSymbol && hasUpperCase && hasLowerCase)) {
      setError("Please write a valid password");
    }
    else if(!isOnlyDigits){
      setError("Please enter number only")
    }
    else if(phone.length!=10){
      setError("Please enter number 10 digits number")
    }
    else if(form.mypass !== form.mycnpass){
      setError("Password is not matching")
    }
// Inside SignUp.jsx -> handleSubmit -> else block
else {
  setError("");

  // 1. Get existing users from localStorage, or an empty array [] if none exist
  let users = JSON.parse(localStorage.getItem("allUsers")) || [];

  // 2. Check if this email is already registered
  let exists = users.find(u => u.myemail === form.myemail);
  
  if (exists) {
    setError("This email is already registered!");
  } else {
    // 3. Add the new user to the array
    users.push(form);

    // 4. Save the updated array back to localStorage
    localStorage.setItem("allUsers", JSON.stringify(users));

    alert("Account created successfully!");
  }
}
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-15">
      {/* Header Section */}
      <header className="w-full h-40 bg-primary flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white tracking-tight">SignUp</h1>
      </header>

      {/* Form Section */}
      <main className="flex-grow flex justify-center items-start pt-12 px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-white rounded-xl shadow-lg border border-gray-100 p-8 w-full max-w-md"
        >
          <p className="text-red-500">{error}</p>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              onChange={handleChange}
              name="myname"
              value={form.myname}
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Email Address</label>
            <input
              onChange={handleChange}
              name="myemail"
              value={form.myemail}
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Phone No.</label>
            <input
              onChange={handleChange}
              name="myphoneno"
              value={form.myphoneno}
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="1234567890"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Password</label>
            <input
              onChange={handleChange}
              name="mypass"
              value={form.mypass}
              type="password"
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              name="mycnpass"
              value={form.mycnpass}
              type="password"
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md active:transform active:scale-95"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
