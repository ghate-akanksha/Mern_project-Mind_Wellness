// document.getElementById("registerForm").addEventListener("submit", function (e) {
//     e.preventDefault(); // stop page refresh

//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value.trim();
//     const confirmPassword = document.getElementById("confirmPassword").value.trim();
//     const message = document.getElementById("message");

//     // 1️⃣ Empty field check
//     if (!name || !email || !password || !confirmPassword) {
//         message.style.color = "red";
//         message.innerText = "All fields are required";
//         return;
//     }

//     // 2️⃣ Password match check
//     if (password !== confirmPassword) {
//         message.style.color = "red";
//         message.innerText = "Passwords do not match";
//         return;
//     }

//     // 3️⃣ Password length
//     if (password.length < 6) {
//         message.style.color = "red";
//         message.innerText = "Password must be at least 6 characters";
//         return;
//     }

//     // 4️⃣ Temporary success (backend next)
//     message.style.color = "green";
//     message.innerText = "Registration data validated successfully";

//     console.log({
//         name,
//         email,
//         password
//     });
// });


document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const error = document.getElementById("error");

    console.log("SENDING 👉", { fullName, email, password, confirmPassword });

    error.innerText = "";

    if (!fullName || !email || !password || !confirmPassword) {
      error.innerText = "All fields are required";
      return;
    }

    if (password !== confirmPassword) {
      error.innerText = "Passwords do not match";
      return;
    }

    if (password.length < 6) {
      error.innerText = "Password must be at least 6 characters";
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword
        })
      });

      const data = await res.json();
      console.log("RESPONSE 👉", data);

      if (!res.ok) {
        error.innerText = data.message || "Registration failed";
        return;
      }

      alert("Registration successful ✅");
      window.location.href = "login.html";

    } catch (err) {
      console.error(err);
      error.innerText = "Server error";
    }

  });

});
