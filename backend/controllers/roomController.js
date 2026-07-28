const db = require("../config/database");

exports.getRooms = async (req, res) => {
    try {
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

        const [results] = await db.query(sql);

        res.json({
            success: true,
            count: results.length,
            data: results,
        });
    } catch (err) {
        console.error("Error loading rooms:", err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};