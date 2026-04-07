// const form = document.getElementById("bookingForm");
// const successMsg = document.getElementById("successMsg");

// form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const phone = document.getElementById("phone").value.trim();
//     const date = document.getElementById("date").value;
//     const time = document.getElementById("time").value;
//     const session = document.getElementById("session").value;

//     if (name === "" || email === "" || phone === "" || date === "" || time === "" || session === "") {
//         alert("Please fill all required fields.");
//         return;
//     }

//     // Simple email validation
//     if (!email.includes("@")) {
//         alert("Please enter a valid email address.");
//         return;
//     }

//     successMsg.innerText = "✅ Appointment booked successfully! We will contact you soon.";
//     form.reset();
// });


const form = document.getElementById("bookingForm");
const successMsg = document.getElementById("successMsg");
const submitBtn = document.getElementById("submitBtn");

// ✅ Prevent past date
const dateInput = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullName = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phoneNumber = document.getElementById("phone").value.trim();
  const preferredDate = document.getElementById("date").value;
  const preferredTime = document.getElementById("time").value;
  const sessionType = document.getElementById("session").value;
  const message = document.getElementById("message").value.trim();

  // ✅ Validation
  if (!fullName || !email || !phoneNumber || !preferredDate || !preferredTime || !sessionType) {
    successMsg.innerText = "❌ Please fill all required fields";
    successMsg.style.color = "red";
    return;
  }

  if (!email.includes("@")) {
    successMsg.innerText = "❌ Invalid email format";
    successMsg.style.color = "red";
    return;
  }

  if (phoneNumber.length !== 10) {
    successMsg.innerText = "❌ Phone number must be 10 digits";
    successMsg.style.color = "red";
    return;
  }

  const token = localStorage.getItem("token");

  // ✅ Disable button (prevent multiple clicks)
  submitBtn.disabled = true;
  submitBtn.innerText = "Booking...";

  try {
    const response = await fetch("http://localhost:5000/api/appointments/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        fullName,
        email,
        phoneNumber,
        preferredDate,
        preferredTime,
        sessionType,
        message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      successMsg.innerText = `❌ ${data.message || "Booking failed"}`;
      successMsg.style.color = "red";

      submitBtn.disabled = false;
      submitBtn.innerText = "Book Appointment";
      return;
    }

    // ✅ Success
    successMsg.innerText = "✅ Appointment booked! Confirmation email sent.";
    successMsg.style.color = "green";

    form.reset();

    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerText = "Book Appointment";

    // Clear message after 5 sec
    setTimeout(() => {
      successMsg.innerText = "";
    }, 5000);

  } catch (error) {
    console.error(error);

    successMsg.innerText = "❌ Server error. Please try again.";
    successMsg.style.color = "red";

    submitBtn.disabled = false;
    submitBtn.innerText = "Book Appointment";
  }
});