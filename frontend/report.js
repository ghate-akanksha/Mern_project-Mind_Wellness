// 1️⃣ Get raw score
const rawScore = Number(localStorage.getItem("assessmentScore"));

// 2️⃣ Configuration
const TOTAL_QUESTIONS = 6;
const MAX_SCORE = TOTAL_QUESTIONS * 2;
const MIN_SCORE = TOTAL_QUESTIONS * -2;

// 3️⃣ Normalize score (0–100)
const normalizedScore = Math.round(
    ((rawScore - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 100
);

// 4️⃣ Display score
document.getElementById("scoreValue").innerText = normalizedScore + "%";

// 5️⃣ Severity + Report
let status = "";
let recommendation = "";
let severity = "";
let color = "";
let actionPlan = "";

if (normalizedScore >= 80) {
    severity = "Low Risk";
    status = "😊 Mentally Healthy";
    color = "#22c55e";
    recommendation =
        "Your responses indicate strong emotional balance and resilience.";
    actionPlan =
        "Maintain your routine, prioritize sleep, and continue healthy habits.";
}
else if (normalizedScore >= 60) {
    severity = "Mild Risk";
    status = "🙂 Mild Stress Indicators";
    color = "#84cc16";
    recommendation =
        "You are functioning well, but early signs of stress are present.";
    actionPlan =
        "Try daily mindfulness, breathing exercises, and physical activity.";
}
else if (normalizedScore >= 40) {
    severity = "Moderate Risk";
    status = "😐 Moderate Stress Level";
    color = "#facc15";
    recommendation =
        "Ongoing stress may be affecting your mental wellness.";
    actionPlan =
        "Journaling, guided meditation, and talking to a counselor can help.";
}
else {
    severity = "High Risk";
    status = "😟 High Stress Level";
    color = "#ef4444";
    recommendation =
        "Your assessment suggests significant emotional distress.";
    actionPlan =
        "Professional counseling is strongly recommended for support.";
}

// 6️⃣ Render report
document.getElementById("statusText").innerText =
    status + " (" + severity + ")";

document.getElementById("recommendationText").innerText =
    recommendation + "\n\nAction Plan: " + actionPlan;

// 7️⃣ Visual feedback (real-world UX)
document.querySelector(".score-box").style.background = color;

// 8️⃣ Session timestamp (for report history)
const timestamp = new Date().toLocaleString();
localStorage.setItem("lastAssessmentTime", timestamp);


function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const score = document.getElementById("scoreValue").innerText;
    const status = document.getElementById("statusText").innerText;
    const recommendation = document.getElementById("recommendationText").innerText;
    const date = new Date().toLocaleString();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Mental Wellness Assessment Report", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${date}`, 20, 30);

    doc.line(20, 35, 190, 35);

    doc.setFont("helvetica", "bold");
    doc.text("Score:", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.text(score, 70, 50);

    doc.setFont("helvetica", "bold");
    doc.text("Status:", 20, 65);
    doc.setFont("helvetica", "normal");
    doc.text(status, 70, 65);

    doc.setFont("helvetica", "bold");
    doc.text("Recommendation:", 20, 80);
    doc.setFont("helvetica", "normal");

    const wrappedText = doc.splitTextToSize(recommendation, 150);
    doc.text(wrappedText, 20, 90);

    doc.line(20, 130, 190, 130);
    doc.text(
        "Note: This assessment is not a medical diagnosis.\nFor serious concerns, please consult a mental health professional.",
        20,
        140
    );

    doc.save("Mental_Wellness_Report.pdf");
}
