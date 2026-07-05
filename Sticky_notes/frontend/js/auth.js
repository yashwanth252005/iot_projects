// // auth.js file

// function getUsers() {
// return JSON.parse(localStorage.getItem("users")) || [];
// }

// function saveUsers(users) {
// localStorage.setItem("users", JSON.stringify(users));
// }

// function signup() {
// const username = document.getElementById("signupUsername").value;
// const password = document.getElementById("signupPassword").value;

// if (!username || !password) {
// alert("Please fill all fields");
// return;
// }

// let users = getUsers();

// const userExists = users.find(user => user.username === username);

// if (userExists) {
// alert("User already exists!");
// return;
// }

// users.push({ username, password });
// saveUsers(users);

// alert("Signup successful! Please login.");
// window.location.href = "login.html";
// }

// function login() {
// const username = document.getElementById("loginUsername").value;
// const password = document.getElementById("loginPassword").value;

// let users = getUsers();

// const validUser = users.find(
// user => user.username === username && user.password === password
// );

// if (!validUser) {
// alert("Invalid credentials");
// return;
// }

// localStorage.setItem("currentUser", username);

// alert("Login successful!");
// window.location.href = "index.html"; // next step
// }

// function logout() {
// localStorage.removeItem("currentUser");
// window.location.href = "login.html";
// }

// const BASE_URL = "http://localhost:8080/api";

// =========================
// SIGNUP
// =========================
async function signup() {
  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/auth/signup`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      window.location.href = "login.html";
    }
  } catch (error) {
    console.error(error);
    alert("Unable to connect to server.");
  }
}

// =========================
// LOGIN
// =========================
async function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!username || !password) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    // Save JWT Token
    localStorage.setItem(CONFIG.TOKEN_KEY, data.token);

    // Save username (useful for UI)
    localStorage.setItem("currentUser", username);

    alert("Login Successful!");

    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
    alert("Unable to connect to server.");
  }
}

// =========================
// LOGOUT
// =========================
function logout() {
  localStorage.removeItem(CONFIG.TOKEN_KEY);
  localStorage.removeItem(CONFIG.USER_KEY);

  window.location.href = "login.html";
}
