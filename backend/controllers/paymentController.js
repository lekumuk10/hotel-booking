const axios = require("axios");
const db = require("../config/database");
const crypto = require("crypto");

// ======================================
// INITIALIZE PAYMENT
// ======================================
exports.initializePayment = async (req, res) => {
  try {
    const {
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

      subtotal,
      tax,
      total,
    } = req.body;

    // Validate required fields
    if (!guest_email || !room_id || !total) {
      return res.status(400).json({
        success: false,
        message: "Missing required booking details.",
      });
    }

    // Generate booking reference
    const booking_reference =
      "BK-" +
      Date.now() +
      "-" +
      crypto.randomBytes(3).toString("hex").toUpperCase();

    // Save booking as Pending
    await db.query(
      `
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

        subtotal,
        tax,
        total,

        payment_method,
        payment_status,
        booking_status

      )

      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `,
      [
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

        subtotal,
        tax,
        total,

        "Card",
        "Pending",
        "Pending",
      ]
    );
const exchangeRate = Number(process.env.USD_TO_KES || 130);
const totalKES = total * exchangeRate;
    // Initialize Paystack
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: guest_email,
        amount: Math.round(totalKES * 100),
        reference: booking_reference,
        callback_url: `${process.env.FRONTEND_URL}/payment/success`,
        channels: ["card"],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Save Paystack access code
    await db.query(
      `
      UPDATE bookings
      SET paystack_access_code=?
      WHERE booking_reference=?
      `,
      [
        response.data.data.access_code,
        booking_reference,
      ]
    );

    return res.json({
      success: true,
      authorization_url: response.data.data.authorization_url,
      access_code: response.data.data.access_code,
      reference: booking_reference,
    });

  } catch (err) {

    console.error(
      "Initialize Payment Error:",
      err.response?.data || err.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to initialize payment.",
    });

  }
};

// ======================================
// VERIFY PAYMENT
// ======================================
exports.verifyPayment = async (req, res) => {
  try {

    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const payment = response.data.data;

    if (
      payment.status === "success" &&
      payment.gateway_response === "Successful"
    ) {

      await db.query(
        `
        UPDATE bookings
        SET

          payment_status='Paid',
          booking_status='Confirmed',
          paystack_reference=?,
          paid_at=NOW()

        WHERE booking_reference=?
        `,
        [
          payment.reference,
          payment.reference,
        ]
      );

    }

    return res.json({
      success: true,
      payment,
    });

  } catch (err) {

    console.error(
      "Verification Error:",
      err.response?.data || err.message
    );

    return res.status(500).json({
      success: false,
      message: "Verification failed.",
    });

  }
};

// ======================================
// PAYSTACK WEBHOOK
// ======================================
exports.webhook = async (req, res) => {

  try {

    console.log("========== PAYSTACK WEBHOOK ==========");
    console.log(req.body);

    res.sendStatus(200);

  } catch (err) {

    console.error(err);

    res.sendStatus(500);

  }

};