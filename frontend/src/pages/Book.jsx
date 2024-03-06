import React, { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext" // Adjust the import path as necessary
import toast from "react-hot-toast"
const Book = () => {
  const { user } = useContext(AuthContext) // Access user from context
  const navigate = useNavigate();
  const location = useLocation()

  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    date: "",
    totalTravelers: 1,
    price: 0,
    totalPrice: 0,
    userId: "", // Initialize userId to an empty string
  })

  const [tourDetails, setTourDetails] = useState({
    destination: "",
    days: "",
    travelAgency: "",
    price: 0,
  })

  useEffect(() => {
    // Update bookingDetails when user object changes
    if (user) {
      setBookingDetails((prevState) => ({
        ...prevState,
        userId: user?.user?._id,
      }))
    }
  }, [user])

  useEffect(() => {
    if (location.state && location.state.tour) {
      const { tour } = location.state
      setTourDetails({
        destination: tour.Destination,
        days: tour.Duration,
        travelAgency: tour.Travel_Company,
        price: tour.Price,
      })

      // Update bookingDetails with tour details
      setBookingDetails((prevState) => ({
        ...prevState,
        price: tour.Price,
        totalPrice: tour.Price * prevState.totalTravelers,
      }))
    }
  }, [location.state])

  const handleTotalTravelersChange = (e) => {
    const totalTravelers = parseInt(e.target.value, 10)
    setBookingDetails((prevState) => ({
      ...prevState,
      totalTravelers,
      totalPrice: prevState.price * totalTravelers,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const requestBody = {
      userId: user._id,
      ...bookingDetails,
      ...tourDetails,
    }

    console.log("Sending request with body:", requestBody)
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include authorization headers if necessary
          },
          body: JSON.stringify(requestBody),
        }
      )

      if (response.ok) {
        const data = await response.json()
        toast.success("Booked")
        console.log("Booking successful:", data)
        navigate("/")
      } else {
        toast.error("Booking Failed")
      }
    } catch (error) {
      console.error("Error:", error)
      // Handle error in booking
    }
  }
  return (
    <div className="flex justify-center">
      {/* Left Side (Tour Details) */}
      <div className="w-1/2 p-8">
        <h2 className="text-xl font-bold mb-4">Tour Details</h2>
        <p>
          <strong>Destination:</strong> {tourDetails.destination}
        </p>
        <p>
          <strong>Days:</strong> {tourDetails.days}
        </p>
        <p>
          <strong>Travel Agency:</strong> {tourDetails.travelAgency}
        </p>
      </div>

      {/* Right Side (Booking Form) */}
      <div className="w-1/2 p-8">
        <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
        <div className="booking-form">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Booking Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={bookingDetails.name}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, name: e.target.value })
                }
                placeholder="Your booking name..."
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Travel Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={bookingDetails.date}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, date: e.target.value })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="totalTravelers"
                className="block text-sm font-medium text-gray-700"
              >
                Total Travelers:
              </label>
              <input
                type="number"
                id="totalTravelers"
                name="totalTravelers"
                value={bookingDetails.totalTravelers}
                onChange={handleTotalTravelersChange}
                placeholder="Total travelers..."
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Total Price:
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={`Rs ${bookingDetails.totalPrice}`}
                readOnly
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Book
