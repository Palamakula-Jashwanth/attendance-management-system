const db = require("../config/db");

// Get all students
exports.getStudents = (req, res) => {
    db.query("SELECT * FROM students", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// Add student
exports.addStudent = (req, res) => {

    const { name, roll_number, class_id, parent_phone } = req.body;

    const sql = `
        INSERT INTO students (name, roll_number, class_id, parent_phone)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, roll_number, class_id, parent_phone], (err, result) => {

        if (err) return res.status(500).json(err);

        res.json({ message: "Student added successfully" });

    });

};

// Update student
exports.updateStudent = (req, res) => {

    const id = req.params.id;
    const { name, roll_number, class_id, parent_phone } = req.body;

    const sql = `
        UPDATE students
        SET name=?, roll_number=?, class_id=?, parent_phone=?
        WHERE id=?
    `;

    db.query(sql, [name, roll_number, class_id, parent_phone, id], (err) => {

        if (err) return res.status(500).json(err);

        res.json({ message: "Student updated successfully" });

    });

};

// Delete student
exports.deleteStudent = (req, res) => {

    const id = req.params.id;

    db.query("DELETE FROM students WHERE id=?", [id], (err) => {

        if (err) return res.status(500).json(err);

        res.json({ message: "Student deleted successfully" });

    });

};