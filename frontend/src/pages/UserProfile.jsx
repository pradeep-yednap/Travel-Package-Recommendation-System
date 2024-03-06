import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    fetch(`http://localhost:5000/api/v1/auth/user/bookings/${user?.user?._id}`)
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.log(error));
  };

  const cancelBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      fetch(`http://localhost:5000/api/v1/auth/bookings/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* User Profile */}
      <div className="mb-8">
        {/* Display user profile details */}
      </div>

      {/* My Bookings */}
      <div className="w-full max-w-md flex justify-center"> {/* Center the table */}
        {bookings.length === 0 ? ( // Check if there are no bookings
          <p>No bookings till now.</p>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-600">My Bookings</h2>
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2 text-blue-800">Booking ID</th>
                  <th className="border border-gray-400 px-4 py-2 text-blue-800">Booking Date</th>
                  <th className="border border-gray-400 px-4 py-2 text-blue-800">Destination</th>
                  <th className="border border-gray-400 px-4 py-2 text-blue-800">Days</th>
                  <th className="border border-gray-400 px-4 py-2 text-blue-800">Travel Agency</th>
                  <th className="border border-gray-400 px-4 py-2 text-blue-800">Price</th>
                  <th className="border border-gray-400 px-4 py-2 text-blue-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id} className="hover:bg-gray-100">
                    <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-400 px-4 py-2">{booking.date}</td>
                    <td className="border border-gray-400 px-4 py-2">{booking.destination}</td>
                    <td className="border border-gray-400 px-4 py-2">{booking.days}</td>
                    <td className="border border-gray-400 px-4 py-2">{booking.travelAgency}</td>
                    <td className="border border-gray-400 px-4 py-2">{booking.price}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      <button className="text-red-500 hover:text-red-700" onClick={() => cancelBooking(booking._id)}>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
