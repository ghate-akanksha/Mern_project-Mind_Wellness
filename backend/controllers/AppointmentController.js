// const Appointment = require("../models/AppointmentModel");
// const nodemailer = require("nodemailer");
// // 📌 Create Appointment
// exports.createAppointment = async (req, res) => {
//   try {
//     const appointment = new Appointment(req.body);
//     await appointment.save();

//     res.status(201).json({
//       success: true,
//       message: "Appointment booked successfully",
//       data: appointment,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to book appointment",
//       error: error.message,
//     });
//   }
// };

// // 📌 Get All Appointments (Admin)
// exports.getAllAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: appointments,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// // 📌 Update Appointment Status
// exports.updateAppointmentStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const appointment = await Appointment.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Appointment status updated",
//       data: appointment,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// // 📌 Delete Appointment
// exports.deleteAppointment = async (req, res) => {
//   try {
//     await Appointment.findByIdAndDelete(req.params.id);

//     res.status(200).json({
//       success: true,
//       message: "Appointment deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };


const Appointment = require("../models/AppointmentModel");
const nodemailer = require("nodemailer");

/* =========================
   📧 Email Transporter
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* =========================
   📌 Create Appointment
========================= */
exports.createAppointment = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      preferredDate,
      preferredTime,
      sessionType,
      message
    } = req.body;

    // ✅ Save appointment
    const appointment = new Appointment({
      fullName,
      email,
      phoneNumber,
      preferredDate,
      preferredTime,
      sessionType,
      message
    });

    await appointment.save();

    // 📧 Send Email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Appointment Booked Successfully",
        html: `
          <h2>Appointment Confirmation</h2>
          <p>Hello ${fullName},</p>
          <p>Your appointment has been successfully booked.</p>

          <p><b>Date:</b> ${preferredDate}</p>
          <p><b>Time:</b> ${preferredTime}</p>
          <p><b>Session:</b> ${sessionType}</p>

          <br/>
          <p>We will contact you soon.</p>
          <p>Thank you,<br/>Mind Wellness Team</p>
        `
      });
    } catch (emailError) {
      console.log("⚠️ Email failed but appointment saved");
    }

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to book appointment",
      error: error.message,
    });
  }
};

/* =========================
   📌 Get All Appointments (Admin)
========================= */
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =========================
   📌 Update Appointment Status
========================= */
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Appointment status updated",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =========================
   📌 Delete Appointment
========================= */
exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};