const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  totalTravelers: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  destination: { type: String, required: true },
  days: { type: Number, required: true },
  travelAgency: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId },
})

const Booking = mongoose.model("Booking", bookingSchema)

module.exports = Booking
