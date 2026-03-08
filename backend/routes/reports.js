const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");

router.get("/student/:id", reportController.getStudentReport);
router.get("/class/:id", reportController.getClassReport);
router.get("/monthly/:class_id", reportController.getMonthlyReport);

module.exports = router;