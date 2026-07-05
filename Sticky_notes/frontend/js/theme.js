function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  const themeButton = document.getElementById("themeToggleBtn");
  if (themeButton) {
    themeButton.textContent = isDark ? "🌙" : "☀";
  }
}

window.addEventListener("load", () => {
  const user = localStorage.getItem("currentUser");

  if (!user) {
    window.location.href = "login.html";
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  const themeButton = document.getElementById("themeToggleBtn");
  if (themeButton) {
    const isDark = document.body.classList.contains("dark");
    themeButton.textContent = isDark ? "🌙" : "☀";
  }
});