const db = require("../config/db");

// Today's attendance summary
exports.getTodayAttendance = (req, res) => {

    const sql = `
        SELECT 
            COUNT(*) AS total_marked,
            SUM(status = 'Present') AS present_count,
            SUM(status = 'Absent') AS absent_count
        FROM attendance
        WHERE date = CURDATE()
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });

};


// List absent students today
exports.getAbsentStudents = (req, res) => {

    const sql = `
        SELECT students.name, students.roll_number
        FROM attendance
        JOIN students ON attendance.student_id = students.id
        WHERE attendance.status = 'Absent'
        AND attendance.date = CURDATE()
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });

};


// Class attendance summary
exports.getClassSummary = (req, res) => {

    const sql = `
        SELECT 
            students.class_id,
            COUNT(attendance.id) AS total_records,
            SUM(attendance.status = 'Present') AS present_count,
            ROUND((SUM(attendance.status = 'Present') / COUNT(attendance.id)) * 100,2) AS attendance_percentage
        FROM attendance
        JOIN students ON attendance.student_id = students.id
        GROUP BY students.class_id
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });

};