// models/Assessment.js
const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  question: String,
  category: {
    type: String,
    enum: ["mental", "social", "career"]
  },
  answer: Number   // 1–5 scale
});

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: String,   // or ObjectId if auth implemented
    required: true
  },
  responses: [responseSchema],

  mentalScore: Number,
  socialScore: Number,
  careerScore: Number,
  totalScore: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Assessment", assessmentSchema);
