const db = require("../config/db");

// Mark attendance
exports.markAttendance = (req, res) => {

    const { student_id, date, status, marked_by } = req.body;

    const sql = `
        INSERT INTO attendance (student_id, date, status, marked_by)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [student_id, date, status, marked_by], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Attendance marked successfully"
        });

    });

};


// Get attendance by class
exports.getClassAttendance = (req, res) => {

    const classId = req.params.class_id;

    const sql = `
        SELECT attendance.*, students.name
        FROM attendance
        JOIN students ON attendance.student_id = students.id
        WHERE students.class_id = ?
    `;

    db.query(sql, [classId], (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};


// Get attendance by student
exports.getStudentAttendance = (req, res) => {

    const studentId = req.params.student_id;

    const sql = `
        SELECT *
        FROM attendance
        WHERE student_id = ?
    `;

    db.query(sql, [studentId], (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};