const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const { verifyToken } = require("../middleware/authMiddleware");

// Protected routes (JWT required)

router.get("/", verifyToken, studentController.getStudents);

router.post("/", verifyToken, studentController.addStudent);

router.put("/:id", verifyToken, studentController.updateStudent);

router.delete("/:id", verifyToken, studentController.deleteStudent);

module.exports = router;