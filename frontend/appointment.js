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

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullName = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phoneNumber = document.getElementById("phone").value.trim();
  const preferredDate = document.getElementById("date").value;
  const preferredTime = document.getElementById("time").value;
  const sessionType = document.getElementById("session").value;
  const message = document.getElementById("message").value.trim();

  if (!fullName || !email || !phoneNumber || !preferredDate || !preferredTime || !sessionType) {
    alert("Please fill all required fields");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:5000/api/appointments/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`   // 🔥 VERY IMPORTANT
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
      alert(data.message || "Booking failed");
      return;
    }

    successMsg.innerText = "✅ Appointment booked successfully!";
    form.reset();

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
});
