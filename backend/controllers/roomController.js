const db = require("../config/database");

exports.getRooms = (req, res) => {

    const sql = `
        SELECT
            id,
            name,
            description,
            max_adults,
            max_children,
            bed_type,
            room_size,
            base_price
        FROM room_types
        ORDER BY base_price ASC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            count: results.length,
            data: results
        });

    });

};