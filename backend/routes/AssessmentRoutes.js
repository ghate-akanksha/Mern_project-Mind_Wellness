// routes/assessmentRoutes.js
const express = require("express");
const router = express.Router();
const {
  submitAssessment,
  getUserAssessments
} = require("../controllers/AssessmentController");

router.post("/", submitAssessment);
router.get("/user/:userId", getUserAssessments);

module.exports = router;
