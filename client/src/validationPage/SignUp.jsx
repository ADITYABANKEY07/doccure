import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. Import Toastify components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();
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

    let cleanEmail = form.myemail.includes("@") && form.myemail.includes(".com");
    let hasNumber = form.mypass.match(/[0-9]/);
    let hasSymbol = form.mypass.match(/[!@#$%^&*]/);
    let hasUpperCase = form.mypass.match(/[A-Z]/);
    let hasLowerCase = form.mypass.match(/[a-z]/);

       if (form.myname.trim()=="") {
      toast.error("Please write a valid name");
      return;
    } 

    if (!cleanEmail) {
      toast.error("Please write a valid email");
      return;
    } 
    
    if (!(hasNumber && hasSymbol && hasUpperCase && hasLowerCase)) {
      toast.error("Password must include uppercase, lowercase, number, and symbol");
      return;
    } 
    
    if (form.mypass !== form.mycnpass) {
      toast.error("Passwords do not match");
      return;
    }

    let users = JSON.parse(localStorage.getItem("allUsers")) || [];
    let exists = users.find((u) => u.myemail === form.myemail);

    if (exists) {
      toast.error("This email is already registered!");
    } else {
      users.push(form);
      localStorage.setItem("allUsers", JSON.stringify(users));
      
      // 3. Replace alert with toast.success
      toast.success("Account created successfully! 🎉", {
        position: "top-right",
        autoClose: 2000,
      });

      // Navigate after a short delay so they see the success toast
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  useGSAP(() => {
    gsap.from(".img", { rotateY: 180, duration: 2, opacity: 0, ease: "power3.out" });
    gsap.from(".left", { x: -40, opacity: 0, duration: 2, ease: "bounce.out" });
  });

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/formbg.jpg')" }}
    >
      {/* 4. Place the ToastContainer here */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />

      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white/50 backdrop-blur-sm rounded-2xl shadow-2xl">
          <div className="left p-10">
            <h2 className="text-3xl font-bold mb-2 text-black">Create Your Account</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
              <input name="myname" value={form.myname} onChange={handleChange} placeholder="Enter your fullname" className="border rounded-md px-4 py-3 focus:ring-3 focus:ring-blue-500 outline-none transition-all" />
              <input name="myemail" value={form.myemail} onChange={handleChange} placeholder="Enter your email address" className="border rounded-md px-4 py-3 focus:ring-3 focus:ring-blue-500 outline-none transition-all" />
              <input type="password" name="mypass" value={form.mypass} onChange={handleChange} placeholder="Enter your password" className="border rounded-md px-4 py-3 focus:ring-3 focus:ring-blue-500 outline-none transition-all" />
              <input type="password" name="mycnpass" value={form.mycnpass} onChange={handleChange} placeholder="Enter your confirm password" className="border rounded-md px-4 py-3 focus:ring-3 focus:ring-blue-500 outline-none transition-all" />

              <button type="submit" className="mt-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                Sign Up
              </button>

              <p className="text-sm text-center text-gray-500 mt-3">
                Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:underline">Log in</Link>
              </p>
            </form>
          </div>

          <div className="hidden md:flex items-center bg-white rounded-tr-2xl rounded-br-2xl justify-center p-10">
            <img src="/docillustration.jpg" alt="Signup Illustration" className="img max-w-sm" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;