const db = require("../config/db");

// Student Attendance Report
exports.getStudentReport = (req, res) => {

    const studentId = req.params.id;

    const sql = `
        SELECT 
            students.name,
            COUNT(attendance.id) AS total_days,
            SUM(attendance.status = 'Present') AS present_days,
            SUM(attendance.status = 'Absent') AS absent_days,
            ROUND((SUM(attendance.status = 'Present') / COUNT(attendance.id)) * 100, 2) AS attendance_percentage
        FROM attendance
        JOIN students ON attendance.student_id = students.id
        WHERE students.id = ?
    `;

    db.query(sql, [studentId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });

};


// Class Attendance Report
exports.getClassReport = (req, res) => {

    const classId = req.params.id;

    const sql = `
        SELECT 
            students.id,
            students.name,
            COUNT(attendance.id) AS total_days,
            SUM(attendance.status = 'Present') AS present_days,
            ROUND((SUM(attendance.status = 'Present') / COUNT(attendance.id)) * 100, 2) AS attendance_percentage
        FROM attendance
        JOIN students ON attendance.student_id = students.id
        WHERE students.class_id = ?
        GROUP BY students.id
    `;

    db.query(sql, [classId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });

};


// Monthly Attendance Report
exports.getMonthlyReport = (req, res) => {

    const classId = req.params.class_id;

    const sql = `
        SELECT 
            students.name,
            attendance.date,
            attendance.status
        FROM attendance
        JOIN students ON attendance.student_id = students.id
        WHERE students.class_id = ?
        ORDER BY attendance.date
    `;

    db.query(sql, [classId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });

};