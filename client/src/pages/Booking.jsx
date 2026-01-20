import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Clock, User, Mail, ChevronDown } from "lucide-react";
import axios from "axios";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [mydata, setMyData] = useState({
    myname: "",
    myemail: "",
    mydoctor: "",
    mydate: "",
    mytime: "",
  });

  let handleChange = (e) => {
    let { name, value } = e.target;
    setMyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const doctorName = params.get("doctor");

    if (doctorName) {
      setMyData((prev) => ({
        ...prev,
        mydoctor: doctorName,
      }));
    }
  }, [location]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Final booking:", mydata);
    let api = "https://doccure-json-backend.onrender.com/appointments";
    let response = await axios.post(api, mydata);
    setIsSubmitted(true); // show side button
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      {!isSubmitted && (
        <button
          onClick={() => navigate("/status")}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 
                     bg-blue-600 text-white px-4 py-3 rounded-full 
                     shadow-lg hover:bg-blue-700 transition"
        >
          🏥 View Booking Status
        </button>
      )}

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Book an <span className="text-blue-600">Appointment</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Please fill in the details to schedule your visit.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User size={16} className="text-blue-500" /> Full Name
            </label>
            <input
              onChange={handleChange}
              name="myname"
              value={mydata.myname}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Mail size={16} className="text-blue-500" /> Email Address
            </label>
            <input
              onChange={handleChange}
              name="myemail"
              value={mydata.myemail}
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              Select Specialist
            </label>
            <div className="relative">
              <select
                onChange={handleChange}
                name="mydoctor"
                value={mydata.mydoctor}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                required
              >
                <option value="" disabled>
                  Choose a doctor
                </option>
                <option value="Dr Ruby Perrin">
                  Dr Ruby Perrin (Orthopedic)
                </option>
                <option value="Dr Darin Elder">
                  Dr Darin Elder (Cardiologist)
                </option>
                <option value="Dr James Amen">Dr James Amen (Neurology)</option>
                <option value="Dr Saeed Tamer">
                  Dr Saeed Tamer (Ophthalmology)
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar size={16} className="text-blue-500" /> Date
              </label>
              <input
                type="date"
                onChange={handleChange}
                name="mydate"
                value={mydata.mydate}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock size={16} className="text-blue-500" /> Time
              </label>
              <div className="relative">
                <select
                  onChange={handleChange}
                  name="mytime"
                  value={mydata.mytime}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                >
                  <option value="" disabled>
                    Select time
                  </option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
