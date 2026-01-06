const token = localStorage.getItem("token");

const loginLink = document.getElementById("loginLink");
const logoutBtn = document.getElementById("logoutBtn");
const title = document.getElementById("title");
const description = document.getElementById("description");

// Default state (not logged in)
logoutBtn.style.display = "none";

// If user is logged in
if (token) {
  loginLink.style.display = "none";
  logoutBtn.style.display = "inline";

  title.innerText = "Welcome Back 👋";
  description.innerText =
    "You can now access assessments and book appointments.";
}

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.reload();
});
