const axios = require("axios");
const db = require("../config/database");

// Initialize Payment
exports.initializePayment = async (req, res) => {
    try {
        const { email, amount, booking_reference } = req.body;

        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email,
                amount: amount * 100,
                reference: booking_reference,
                callback_url: `${process.env.FRONTEND_URL}/payment/success`
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        );

        res.json(response.data);

    } catch (err) {
        console.error(err.response?.data || err.message);

        res.status(500).json({
            success: false,
            message: "Unable to initialize payment"
        });
    }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {

    try {

        const { reference } = req.params;

        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        );

        const payment = response.data.data;

        if (payment.status === "success") {

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
                    reference,
                    reference
                ]
            );

        }

        res.json(response.data);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success:false,
            message:"Verification failed"
        });

        exports.webhook = async (req, res) => {

    console.log("===== PAYSTACK WEBHOOK =====");
    console.log(req.body);

    res.sendStatus(200);

};

    }

};