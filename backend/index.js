// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const connectDB = require("./config/db");

// // Route imports
// const authRoutes = require("./routes/authRoutes");

// const app = express();

// /* =========================
//    🔌 Database Connection
// ========================= */
// connectDB();

// /* =========================
//    ✅ Middlewares
// ========================= */
// app.use(cors({
//   origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use(express.json());

// /* =========================
//    🧪 Test Route
// ========================= */
// app.get("/", (req, res) => {
//   res.json({ message: "Server running 🚀" });
// });

// /* =========================
//    🚦 Routes
// ========================= */
// app.use("/api/auth", authRoutes);

// /* =========================
//    ❌ 404 Handler
// ========================= */


// app.use((req, res, next) => {
//   console.log("👉 REQUEST:", req.method, req.originalUrl);
//   next();
// });

// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// /* =========================
//    🚀 Start Server
// ========================= */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const assessmentRoutes = require("./routes/AssessmentRoutes");
const appointmentRoutes = require("./routes/AppointmentRoute");


const app = express();

/* =========================
   🔌 Database Connection
========================= */
connectDB();

/* =========================
   ✅ Middlewares
========================= */
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

/* =========================
   🧪 Request Logger (MOVE HERE)
========================= */
app.use((req, res, next) => {
  console.log("👉 REQUEST:", req.method, req.originalUrl);
  next();
});

/* =========================
   🧪 Test Route
========================= */
app.get("/", (req, res) => {
  res.json({ message: "Server running 🚀" });
});

/* =========================
   🚦 Routes
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/appointments", appointmentRoutes);


/* =========================
   ❌ 404 Handler (LAST)
========================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* =========================
   🚀 Start Server
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
