import axios from "axios";
import React, { useEffect, useState } from "react";

const BASE_URL = "https://doccure-json-backend.onrender.com"; // <-- CHANGE IF YOUR LINK IS DIFFERENT

const Status = () => {
  const [booking, setBooking] = useState([]);

  const loadData = async () => {
    const response = await axios.get(`${BASE_URL}/appointments`);
    console.log(response.data);
    setBooking(response.data);
  };

  const myDel = async (id) => {
    await axios.delete(`${BASE_URL}/appointments/${id}`);
    alert("Booking deleted");
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (booking.length === 0) {
    return <h2 className="text-center mt-20">No booking found.</h2>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl overflow-x-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Appointment Status
        </h2>

        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Doctor</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {booking.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100 transition">
                <td className="px-4 py-3">{item.myname}</td>
                <td className="px-4 py-3">{item.myemail}</td>
                <td className="px-4 py-3">{item.mydoctor}</td>
                <td className="px-4 py-3">{item.mydate}</td>
                <td className="px-4 py-3 font-semibold text-primary">
                  {item.mytime}
                </td>
                <td>
                  <button
                    onClick={() => myDel(item.id)}
                    className="px-3 py-2 bg-primary text-white font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Status;
