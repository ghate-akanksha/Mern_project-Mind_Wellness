

// document.getElementById("loginForm").addEventListener("submit", async function (e) {
//     e.preventDefault(); // Stop page reload

//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value.trim();
//     const message = document.getElementById("message");

//     // Reset message
//     message.innerText = "";
//     message.style.color = "red";

//     // 1️⃣ Empty field check
//     if (!email || !password) {
//         message.innerText = "Please enter email and password";
//         return;
//     }

//     try {
//         const response = await fetch("http://localhost:5000/api/auth/login", { // ✅ Correct URL
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ email, password })
//         });

//         const data = await response.json();

//         // ❌ Backend returned an error
//         if (!response.ok) {
//             message.innerText = data.message || "Login failed";
//             return;
//         }

//         // ✅ Save token & user in localStorage
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         message.style.color = "green";
//         message.innerText = "Login successful";

//         // 🔁 Redirect after login
//         setTimeout(() => {
//             window.location.href = "index.html";
//         }, 1000);

//     } catch (error) {
//         console.error("Login Error:", error);
//         message.innerText = "Server error. Try again later.";
//     }
// });

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Stop page reload

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    message.innerText = "";
    message.style.color = "red";

    // Empty field check
    if (!email || !password) {
        message.innerText = "Please enter email and password";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            message.innerText = data.message || "Login failed";
            return;
        }

        // ✅ STORE JWT TOKEN ONLY
        localStorage.setItem("token", data.token);
         localStorage.setItem("userId", data.user.id);

        message.style.color = "green";
        message.innerText = "Login successful";

        // Redirect to dashboard / home
        setTimeout(() => {
            window.location.href = "index.html";
        }, 800);

    } catch (error) {
        console.error("Login Error:", error);
        message.innerText = "Server error. Try again later.";
    }
});
