function getUsers() {
return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
localStorage.setItem("users", JSON.stringify(users));
}

function signup() {
const username = document.getElementById("signupUsername").value;
const password = document.getElementById("signupPassword").value;

if (!username || !password) {
alert("Please fill all fields");
return;
}

let users = getUsers();

const userExists = users.find(user => user.username === username);

if (userExists) {
alert("User already exists!");
return;
}

users.push({ username, password });
saveUsers(users);

alert("Signup successful! Please login.");
window.location.href = "login.html";
}

function login() {
const username = document.getElementById("loginUsername").value;
const password = document.getElementById("loginPassword").value;

let users = getUsers();

const validUser = users.find(
user => user.username === username && user.password === password
);

if (!validUser) {
alert("Invalid credentials");
return;
}

localStorage.setItem("currentUser", username);

alert("Login successful!");
window.location.href = "index.html"; // next step
}

function logout() {
localStorage.removeItem("currentUser");
window.location.href = "login.html";
}
