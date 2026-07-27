require("dotenv").config();

const express = require("express");
const cors = require("cors");

const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hotel Booking API is running"
    });
});

app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});