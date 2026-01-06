const express = require("express");
const router = express.Router();

// Controllers
const { registerUser } = require("../controllers/authController");
const { login } = require("../controllers/userController");

/**
 * @route   POST /api/auth/register
 * @desc    Register user
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", login);

module.exports = router;
