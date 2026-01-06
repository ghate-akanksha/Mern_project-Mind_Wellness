// controllers/assessmentController.js
const Assessment = require("../models/AssessmentModel");

exports.submitAssessment = async (req, res) => {
  try {
    const { userId, responses } = req.body;

    let mental = 0, social = 0, career = 0;

    responses.forEach(r => {
      if (r.category === "mental") mental += r.answer;
      if (r.category === "social") social += r.answer;
      if (r.category === "career") career += r.answer;
    });

    const assessment = new Assessment({
      userId,
      responses,
      mentalScore: mental,
      socialScore: social,
      careerScore: career,
      totalScore: mental + social + career
    });

    await assessment.save();
    res.status(201).json({ message: "Assessment saved" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserAssessments = async (req, res) => {
  const { userId } = req.params;
  const data = await Assessment.find({ userId }).sort({ createdAt: -1 });
  res.json(data);
};
