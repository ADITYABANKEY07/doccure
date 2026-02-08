import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MoveLeft,
  Trash2,
  SquarePen,
  Calendar,
  Clock,
  User,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const Status = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState({
    myname: "",
    myemail: "",
    mydoctor: "",
    mydate: "",
    mytime: "",
  });

  let navigate = useNavigate();
  let currentEmail = localStorage.getItem("useremail");

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/appointments");
      let filterData = response.data.filter(
        (item) => item.loggedUser === currentEmail,
      );
      setBooking(filterData);
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredBookings = booking.filter((item) =>
    item.myname.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShow((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editId) return;

    try {
      await axios.put(`http://localhost:3000/appointments/${editId}`, show);
      toast.success("Appointment Updated Successfully! ✨");
      setEditForm(false);
      setEditId(null);
      loadData();
    } catch (error) {
      toast.error("Failed to update appointment");
    }
  };

const myDel = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this appointment!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, cancel it!",
    cancelButtonText: "No, keep it"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/appointments/${id}`);
        
       
        Swal.fire(
          "Cancelled!",
          "Your appointment has been removed.",
          "success"
        );
        
        loadData();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  });
};

  const myEdit = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/appointments/${id}`,
      );
      setShow(response.data);
      setEditId(id);
      setEditForm(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (error) {
      toast.error("Could not fetch appointment details");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-600 font-bold">
        Loading...
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" theme="colored" />

      {/* HEADER */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          <MoveLeft size={18} /> Go Back
        </button>

        <h2 className="text-2xl font-bold text-gray-800">
          {editId ? "Edit Appointment" : "Appointment Status"}
        </h2>
      </div>

      {/* SEARCH */}
      <div className="w-full max-w-6xl mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all"
        />
      </div>

      {/* NO DATA */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow-md text-center w-full max-w-xl">
          <p className="text-gray-500">No matching appointments found.</p>
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden md:block w-full max-w-6xl bg-white rounded-xl shadow overflow-hidden">
            <table className="min-w-full divide-y">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Doctor</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Time</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-3">{item.myname}</td>
                    <td className="px-6 py-3">{item.myemail}</td>
                    <td className="px-6 py-3">{item.mydoctor}</td>
                    <td className="px-6 py-3">{item.mydate}</td>
                    <td className="px-6 py-3 font-semibold text-blue-600">
                      {item.mytime}
                    </td>
                    <td className="px-6 py-3 text-center flex gap-4 justify-center">
                      <button
                        onClick={() => myEdit(item.id)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors"
                      >
                        <SquarePen size={16} /> Edit
                      </button>
                      <button
                        onClick={() => myDel(item.id)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1 font-medium transition-colors"
                      >
                        <Trash2 size={16} /> Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW */}
          <div className="md:hidden w-full max-w-6xl grid grid-cols-1 gap-4 mt-4">
            {filteredBookings.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-lg font-bold text-gray-800">{item.myname}</p>
                    <p className="text-sm text-gray-500">{item.myemail}</p>
                  </div>
                  <span className="text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded text-sm">
                    {item.mytime}
                  </span>
                </div>

                <div className="text-sm text-gray-700 space-y-1 mb-4">
                  <p><strong>Doctor:</strong> {item.mydoctor}</p>
                  <p><strong>Date:</strong> {item.mydate}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => myEdit(item.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-lg font-semibold active:bg-blue-100 transition-colors"
                  >
                    <SquarePen size={18} /> Edit
                  </button>

                  <button
                    onClick={() => myDel(item.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold active:bg-red-100 transition-colors"
                  >
                    <Trash2 size={18} /> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* EDIT FORM SECTION */}
      {editForm && (
        <div className="w-full max-w-xl mt-10">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
             <SquarePen size={20} />
             <h3 className="font-bold text-lg">Update Appointment Details</h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-lg border space-y-4"
          >
            <input
              name="myname"
              value={show.myname}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500 transition-all"
              required
            />

            <input
              name="myemail"
              value={show.myemail}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500 transition-all"
              required
            />

            <select
              name="mydoctor"
              value={show.mydoctor}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500 transition-all bg-white"
            >
              <option value="" disabled>Choose a doctor</option>
              <option value="Dr Ankit Sharma">Dr Ankit Sharma (Orthopedic)</option>
              <option value="Dr Priya Verma">Dr Priya Verma (Cardiologist)</option>
              <option value="Dr Rohit Mehta">Dr Rohit Mehta (Neurology)</option>
              <option value="Dr Neha Gupta">Dr Neha Gupta (General Physician)</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar size={16} className="text-primary" /> Date
                </label>
                <input
                  type="date"
                  name="mydate"
                  value={show.mydate}
                  min={today}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock size={16} className="text-primary" /> Time
                </label>
                <select
                  name="mytime"
                  value={show.mytime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500 transition-all bg-white"
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

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-grow bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors shadow-md active:scale-[0.98]"
              >
                Update Appointment
              </button>
              <button
                type="button"
                onClick={() => {setEditForm(false); setEditId(null);}}
                className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-bold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Status;