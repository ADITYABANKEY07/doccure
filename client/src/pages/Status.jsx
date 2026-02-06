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

  // LOAD DATA
  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/appointments");
      let filterData = response.data.filter(
        (item) => item.loggedUser === currentEmail,
      );
      setBooking(filterData);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // FILTER DATA (LIVE SEARCH)
  const filteredBookings = booking.filter((item) =>
    item.myname.toLowerCase().includes(search.toLowerCase()),
  );

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShow((prev) => ({ ...prev, [name]: value }));
  };

  // UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editId) return;

    try {
      await axios.put(`http://localhost:3000/appointments/${editId}`, show);
      alert("Appointment Updated Successfully!");
      setEditForm(false);
      setEditId(null);
      loadData();
    } catch (error) {
      alert("Failed to update appointment");
    }
  };

  // DELETE
  const myDel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      await axios.delete(`http://localhost:3000/appointments/${id}`);
      alert("Appointment Cancelled Successfully");
      loadData();
    }
  };

  // EDIT
  const myEdit = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/appointments/${id}`,
      );
      setShow(response.data);
      setEditId(id);
      setEditForm(true);
    } catch (error) {
      console.log("Edit error", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg"
        >
          <MoveLeft size={18} /> Go Back
        </button>

        <h2 className="text-2xl font-bold">
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
          className="w-full md:w-1/3 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
              <tbody>
                {filteredBookings.map((item) => (
                  <tr key={item.id} className=" hover:bg-gray-50">
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
                        className="text-blue-600 flex items-center gap-1"
                      >
                        <SquarePen size={16} /> Edit
                      </button>
                      <button
                        onClick={() => myDel(item.id)}
                        className="text-red-600 flex items-center gap-1"
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
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-lg font-bold text-gray-800">
                      {item.myname}
                    </p>
                    <p className="text-sm text-gray-500">{item.myemail}</p>
                  </div>
                  <span className="text-blue-600 font-semibold">
                    {item.mytime}
                  </span>
                </div>

                {/* Details */}
                <div className="text-sm text-gray-700 space-y-1 mb-4">
                  <p>
                    <strong>Doctor:</strong> {item.mydoctor}
                  </p>
                  <p>
                    <strong>Date:</strong> {item.mydate}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => myEdit(item.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-600 rounded-lg font-semibold"
                  >
                    <SquarePen size={18} />
                    Edit
                  </button>

                  <button
                    onClick={() => myDel(item.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold"
                  >
                    <Trash2 size={18} />
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* EDIT FORM */}
      {editForm && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white p-6 mt-8 rounded-xl shadow space-y-4"
        >
          <input
            name="myname"
            value={show.myname}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500"
            required
          />

          <input
            name="myemail"
            value={show.myemail}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500"
            required
          />

          <select
            name="mydoctor"
            value={show.mydoctor}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500"
          >
            <option value="" disabled>
              Choose a doctor
            </option>
            <option value="Dr Ankit Sharma">
              Dr Ankit Sharma (Orthopedic)
            </option>
            <option value="Dr Priya Verma">
              Dr Priya Verma (Cardiologist)
            </option>
            <option value="Dr Rohit Mehta">Dr Rohit Mehta (Neurology)</option>
            <option value="Dr Neha Gupta">Dr Neha Gupta (Ophthalmology)</option>
          </select>

          <input
            type="date"
            name="mydate"
            value={show.mydate}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500"
            required
          />

          <select
            name="mytime"
            value={show.mytime}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500"
            required
          >
            <option value="">Select Time</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="11:30 AM">11:30 AM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="05:30 PM">05:30 PM</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
          >
            Update Appointment
          </button>
        </form>
      )}
    </div>
  );
};

export default Status;
