const Booking = require("../models/booking")

// Endpoint to handle booking submissions
const createBooking = async (req, res) => {
  console.log(req.body)
  try {
    const newBooking = new Booking(req.body)
    await newBooking.save()
    res.status(201).send(newBooking)
  } catch (error) {
    console.error("Error saving booking:", error)
    res.status(400).send({ error: "Failed to save booking" })
  }
}

const getBookings = async (req, res) => {
  const { id } = req.params
  try {
   
    const bookings = await Booking.find({ userId:id })
    
    res.status(200).send(bookings)
  } catch (error) {
    console.error("Error getting bookings:", error)
    
    res.status(500).send({ error: "Failed to get bookings" })
  }
}

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).send({ error: "Booking not found" })
    }
    res.status(200).send(booking)
  } catch (error) {
    console.error("Error getting booking by id:", error)
    res.status(500).send({ error: "Failed to get booking" })
  }
}

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id)
    if (!booking) {
      return res.status(404).send({ error: "Booking not found" })
    }
    res.status(200).send(booking)
  } catch (error) {
    console.error("Error deleting booking:", error)
    res.status(500).send({ error: "Failed to delete booking" })
  }
}

module.exports = { createBooking, getBookings, getBookingById, deleteBooking }
