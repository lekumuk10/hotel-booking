const axios = require("axios");

exports.initializePayment = async (req, res) => {
    try {

        const {
            email,
            amount,
            booking_reference
        } = req.body;

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
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Payment initialization failed"
        });

    }
};