import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Clock, User, Mail, ClipboardList } from "lucide-react";
import axios from "axios";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mydata, setMyData] = useState({
    myname: "",
    myemail: "",
    mydoctor: "",
    mydate: "",
    mytime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const doctorName = params.get("doctor");
    if (doctorName) {
      setMyData((prev) => ({ ...prev, mydoctor: doctorName }));
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let loggedEmail = localStorage.getItem()
      let api = "http://localhost:3000/appointments";
      await axios.post(api, {...mydata, loggedUser: loggedEmail});
      alert("Appointment Booked Successfully!");
      navigate("/status");
    } catch (error) {
      alert("Error booking appointment");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-50 p-4 pt-20">
      
      {/* ALWAYS VISIBLE VIEW STATUS BUTTON */}
      <button
        onClick={() => navigate("/status")}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-2 bg-white text-primary border-2 border-primary px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 group"
      >
        <ClipboardList size={20} className="group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">View All Bookings</span>
        <span className="sm:hidden">Status</span>
      </button>

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Book an <span className="text-primary">Appointment</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Please fill in the details to schedule your visit.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User size={16} className="text-primary" /> Full Name
            </label>
            <input
              onChange={handleChange}
              name="myname"
              value={mydata.myname}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Mail size={16} className="text-primary" /> Email Address
            </label>
            <input
              onChange={handleChange}
              name="myemail"
              value={mydata.myemail}
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Specialist Select */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Select Specialist</label>
            <select
              onChange={handleChange}
              name="mydoctor"
              value={mydata.mydoctor}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            >
              <option value="" disabled>Choose a doctor</option>
              <option value="Dr Ruby Perrin">Dr Ruby Perrin (Orthopedic)</option>
              <option value="Dr Darin Elder">Dr Darin Elder (Cardiologist)</option>
              <option value="Dr James Amen">Dr James Amen (Neurology)</option>
              <option value="Dr Saeed Tamer">Dr Saeed Tamer (Ophthalmology)</option>
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar size={16} className="text-primary" /> Date
              </label>
              <input
                type="date"
                onChange={handleChange}
                name="mydate"
                value={mydata.mydate}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock size={16} className="text-primary" /> Time
              </label>
              <select
                onChange={handleChange}
                name="mytime"
                value={mydata.mytime}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                required
              >
                <option value="" disabled>Select time</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="05:30 PM">05:30 PM</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-[0.98] mt-4"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;