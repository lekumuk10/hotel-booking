const db = require("../config/database");

exports.createBooking = async (req, res) => {
  try {
    const {
      booking_reference,
      room_id,
      room_name,
      guest_first_name,
      guest_last_name,
      guest_email,
      guest_phone,
      check_in,
      check_out,
      nights,
      adults,
      children,
      rooms,
      price_per_night,
      subtotal,
      tax,
      total,
      payment_method,
      payment_status,
      booking_status
    } = req.body;

    const sql = `
      INSERT INTO bookings (
        booking_reference,
        room_id,
        room_name,
        guest_first_name,
        guest_last_name,
        guest_email,
        guest_phone,
        check_in,
        check_out,
        nights,
        adults,
        children,
        rooms,
        price_per_night,
        subtotal,
        tax,
        total,
        payment_method,
        payment_status,
        booking_status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(sql, [
      booking_reference,
      room_id,
      room_name,
      guest_first_name,
      guest_last_name,
      guest_email,
      guest_phone,
      check_in,
      check_out,
      nights,
      adults,
      children,
      rooms,
      price_per_night,
      subtotal,
      tax,
      total,
      payment_method,
      payment_status || "Pending",
      booking_status || "Confirmed"
    ]);

    res.status(201).json({
      success: true,
      message: "Booking created successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message
    });
  }
};