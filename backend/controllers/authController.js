const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register Teacher
exports.register = async (req, res) => {

    const { name, username, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO teachers (name, username, password) VALUES (?, ?, ?)";

        db.query(sql, [name, username, hashedPassword], (err, result) => {

            if (err) {

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({
                        message: "Username already exists"
                    });
                }

                return res.status(500).json(err);
            }

            res.json({
                message: "Teacher registered successfully"
            });

        });

    } catch (error) {
        res.status(500).json(error);
    }

};


// Login Teacher
exports.login = (req, res) => {

    const { username, password } = req.body;

    const sql = "SELECT * FROM teachers WHERE username = ?";

    db.query(sql, [username], async (err, results) => {

        if (err) return res.status(500).json(err);

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid username"
            });
        }

        const teacher = results[0];

        const match = await bcrypt.compare(password, teacher.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: teacher.id,
                username: teacher.username
            },
            "attendance_secret_key",
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful",
            token: token,
            teacher: {
                id: teacher.id,
                name: teacher.name,
                username: teacher.username
            }
        });

    });

};