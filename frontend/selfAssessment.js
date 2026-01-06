const questionPool = [
    { text: "I feel calm most of the time", positive: true },
    { text: "I feel anxious frequently", positive: false },
    { text: "I sleep well at night", positive: true },
    { text: "I feel overwhelmed easily", positive: false },
    { text: "I feel motivated daily", positive: true },
    { text: "I feel lonely often", positive: false },
    { text: "I can focus on my tasks", positive: true },
    { text: "I feel mentally exhausted", positive: false },
    { text: "I enjoy my daily activities", positive: true },
    { text: "I feel hopeless sometimes", positive: false },

    { text: "I feel confident about myself", positive: true },
    { text: "I overthink small issues", positive: false },
    { text: "I manage stress well", positive: true },
    { text: "I feel emotionally drained", positive: false },
    { text: "I feel positive about my future", positive: true },
    { text: "I feel irritated easily", positive: false },
    { text: "I maintain a healthy routine", positive: true },
    { text: "I feel pressured most of the time", positive: false },
    { text: "I feel relaxed at home", positive: true },
    { text: "I struggle with self-doubt", positive: false },

    { text: "I feel energetic during the day", positive: true },
    { text: "I feel disconnected from others", positive: false },
    { text: "I handle challenges confidently", positive: true },
    { text: "I feel stressed without reason", positive: false },
    { text: "I feel satisfied with my life", positive: true },
    { text: "I feel mentally unstable", positive: false },
    { text: "I feel balanced emotionally", positive: true },
    { text: "I feel burdened by responsibilities", positive: false },
    { text: "I feel hopeful", positive: true },
    { text: "I feel worried often", positive: false },

    { text: "I feel mentally strong", positive: true },
    { text: "I feel emotionally weak", positive: false },
    { text: "I feel peaceful inside", positive: true },
    { text: "I feel nervous frequently", positive: false },
    { text: "I feel happy without reason", positive: true },
    { text: "I feel trapped in my thoughts", positive: false },
    { text: "I feel stable emotionally", positive: true },
    { text: "I feel restless most days", positive: false },
    { text: "I feel in control of my emotions", positive: true },
    { text: "I feel mentally tired often", positive: false },
    { text: "I feel optimistic", positive: true }
];

// shuffle questions
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// select 6 random questions
const selectedQuestions = shuffle(questionPool).slice(0, 6);

const form = document.getElementById("assessmentForm");

// render questions
selectedQuestions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";

    div.innerHTML = `
        <p><strong>${index + 1}. ${q.text}</strong></p>
        <label><input type="radio" name="q${index}" value="2" required> Yes</label><br>
        <label><input type="radio" name="q${index}" value="0"> Sometimes</label><br>
        <label><input type="radio" name="q${index}" value="-2"> No</label>
    `;

    form.appendChild(div);
});

function submitAssessment() {
    let score = 0;

    for (let i = 0; i < selectedQuestions.length; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selected) {
            alert("Please answer all questions!");
            return;
        }

        const value = Number(selected.value);
        score += selectedQuestions[i].positive ? value : -value;
    }

    localStorage.setItem("assessmentScore", score);
    window.location.href = "report.html";
}
