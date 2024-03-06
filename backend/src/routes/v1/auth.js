const express = require("express")
const router = express.Router()
const {
  loginController,
  registerController,
} = require("../../controllers/auth")
const { aiController } = require("../../../script/reccomendation.js")
const {
  getBookings,
  createBooking,
  getBookingById,
  deleteBooking,
} = require("../../controllers/booking.js")

router.get("/login", (req, res) => {
  console.log(".login")
  res.status(200).json({ message: "Login route" })
})

router.post("/login", loginController)
router.post("/register", registerController)
router.post("/travel", aiController)
router.post("/bookings", createBooking)
router.get("/user/bookings/:id", getBookings)
router.get("/bookings/:id", getBookingById)
router.delete("/bookings/:id", deleteBooking)

module.exports = router
