const db = require("../config/db");

// Get all holidays
exports.getHolidays = (req, res) => {

    const sql = "SELECT * FROM holidays ORDER BY date";

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });

};


// Add holiday
exports.addHoliday = (req, res) => {

    const { date, reason } = req.body;

    const sql = `
        INSERT INTO holidays (date, reason)
        VALUES (?, ?)
    `;

    db.query(sql, [date, reason], (err, result) => {

        if (err) {

            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({
                    message: "Holiday already exists for this date"
                });
            }

            return res.status(500).json(err);
        }

        res.json({
            message: "Holiday added successfully"
        });

    });

};


// Delete holiday
exports.deleteHoliday = (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM holidays WHERE id = ?";

    db.query(sql, [id], (err) => {

        if (err) return res.status(500).json(err);

        res.json({
            message: "Holiday deleted successfully"
        });

    });

};