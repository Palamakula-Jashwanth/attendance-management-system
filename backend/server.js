const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const attendanceRoutes = require("./routes/attendance");
const reportRoutes = require("./routes/reports");
const holidayRoutes = require("./routes/holidays");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Attendance Management System API Running");
});

// Test API - Get all teachers
app.get("/teachers", (req, res) => {

    const sql = "SELECT * FROM teachers";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database query failed" });
        }

        res.json(results);
    });

});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Student Routes
app.use("/api/students", studentRoutes);

// Attendance Routes
app.use("/api/attendance", attendanceRoutes);

//reports routes
app.use("/api/reports", reportRoutes);

//holiday routes
app.use("/api/holidays", holidayRoutes);

//dashboard routes
app.use("/api/dashboard", dashboardRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});