const express = require("express");
const router = express.Router();

const {
  createBooking,
} = require("../controllers/bookingController");

// Create Booking
router.post("/", createBooking);

module.exports = router;