import axios from "axios";
import React, { useEffect, useState } from "react";
import { MoveLeft, Trash2 } from "lucide-react";

const BASE_URL = "https://doccure-json-backend.onrender.com";

const Status = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/appointments`);
      setBooking(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const myDel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      await axios.delete(`${BASE_URL}/appointments/${id}`);
      loadData();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4 md:p-10">
      
      {/* Navigation & Header Section */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center w-fit gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-primary transition-all group"
        >
          <MoveLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Go Back</span>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800">Appointment Status</h2>
      </div>

      {booking.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow-md text-center w-full max-w-xl">
          <p className="text-gray-500">No bookings found.</p>
        </div>
      ) : (
        <>
          {/* DESKTOP VIEW: Visible only on md screens and up */}
          <div className="hidden md:block w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary">
                <tr>
                  {["Name", "Email", "Doctor", "Date", "Time", "Action"].map((head) => (
                    <th key={head} className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {booking.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.myname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.myemail}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{item.mydoctor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.mydate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">{item.mytime}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => myDel(item.id)} className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                        <Trash2 size={16} /> Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW: Cards visible only on small screens */}
          <div className="grid grid-cols-1 gap-4 w-full max-w-6xl md:hidden">
            {booking.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl shadow-md border-l-4 border-primary">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-lg font-bold text-gray-800">{item.myname}</p>
                    <p className="text-sm text-gray-500">{item.myemail}</p>
                  </div>
                  <span className="text-primary font-bold">{item.mytime}</span>
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Doctor:</strong> {item.mydoctor}</p>
                  <p><strong>Date:</strong> {item.mydate}</p>
                </div>
                <button 
                  onClick={() => myDel(item.id)}
                  className="mt-4 w-full py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition"
                >
                  Cancel Appointment
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Status;