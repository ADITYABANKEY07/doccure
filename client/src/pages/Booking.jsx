import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Mail, ChevronDown } from 'lucide-react';

const Booking = () => {
  const location = useLocation();
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    // Extract 'doctor' from URL: e.g., ?doctor=Dr Darin Elder
    const params = new URLSearchParams(location.search);
    const doctorName = params.get("doctor");
    
    if (doctorName) {
      setSelectedDoctor(doctorName);
    }
  }, [location]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Book an <span className="text-blue-600">Appointment</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Please fill in the details to schedule your visit.</p>
        </div>

        <form className="space-y-5">
          {/* Patient Name */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User size={16} className="text-blue-500" /> Full Name
            </label>
            <input 
              type="text" 
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              required 
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Mail size={16} className="text-blue-500" /> Email Address
            </label>
            <input 
              type="email" 
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              required 
            />
          </div>

          {/* Doctor Selection - Now controlled by selectedDoctor state */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Select Specialist</label>
            <div className="relative">
              <select 
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none appearance-none transition-all"
                required
              >
                <option value="" disabled>Choose a doctor</option>
                <option value="Dr Ruby Perrin">Dr Ruby Perrin (Orthopedic)</option>
                <option value="Dr Darin Elder">Dr Darin Elder (Cardiologist)</option>
                <option value="Dr James Amen">Dr James Amen (Neurology)</option>
                <option value="Dr Saeed Tamer">Dr Saeed Tamer (Ophthalmology)</option>
              </select>
              <ChevronDown size={18} className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Date and Time Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar size={16} className="text-blue-500" /> Date
              </label>
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
                required 
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock size={16} className="text-blue-500" /> Time
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none appearance-none transition-all text-sm">
                  <option>09:00 AM</option>
                  <option>11:30 AM</option>
                  <option>03:00 PM</option>
                  <option>05:30 PM</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all transform active:scale-[0.98] mt-4"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;