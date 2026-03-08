const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/today-attendance", dashboardController.getTodayAttendance);
router.get("/absent-students", dashboardController.getAbsentStudents);
router.get("/class-summary", dashboardController.getClassSummary);

module.exports = router;