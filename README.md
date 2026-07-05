# 🗒️ Sticky Notes - Full Stack Web Application

<p align="center">

<img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring%20Boot-4.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens"/>
<img src="https://img.shields.io/badge/Maven-Build-C71A36?style=for-the-badge&logo=apachemaven"/>
<img src="https://img.shields.io/badge/HTML5-Frontend-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-Styles-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/REST-API-blue?style=for-the-badge"/>
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Version-v1.0-blue?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge"/>

</p>

---

## 📖 Overview

A modern Full Stack Sticky Notes application built using **Spring Boot**, **MongoDB Atlas**, **JWT Authentication**, and **Vanilla JavaScript**. The application enables users to securely manage personal sticky notes with real-time CRUD operations, authentication, drag-and-drop functionality, search, categorization, and persistent cloud storage.

Built using **HTML**, **CSS**, **JavaScript**, **Spring Boot**, **MongoDB Atlas**, and **JWT Authentication**, the application provides a clean user interface with real-time note management and persistent storage.

---

## 📸 Preview

> Add screenshots or a GIF here after uploading your project.

Example:

```
assets/login.png
assets/dashboard.png
assets/demo.gif
```

---

# ✨ Features

### 🔐 Authentication
- User Registration
- Secure Login
- JWT-based Authentication
- Protected API Endpoints
- Session Management
- Logout Functionality

### 📝 Note Management
- Create Notes
- Edit Notes
- Delete Notes
- Automatic Saving
- Persistent Cloud Storage
- Notes remain available after refresh

### 🎨 User Experience
- Drag & Drop Sticky Notes
- Color Picker for Notes
- Categories
- Search Notes
- Responsive Design
- Modern User Interface
- Dark / Light Theme
- User-specific Notes

### ☁️ Backend Features
- RESTful APIs
- Spring Boot Backend
- MongoDB Atlas Database
- JWT Token Validation
- Layered Architecture
- Maven Build System

---

# 🛠️ Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)

## Backend

- Spring Boot
- Spring Security
- JWT Authentication
- Maven

## Database

- MongoDB Atlas

## Development Tools

- IntelliJ IDEA
- Visual Studio Code
- Git
- GitHub

---

# 📂 Project Structure

```
StickyNotes/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── dto/
│   ├── security/
│   ├── config/
│   └── StickyNotesApplication.java
│
└── README.md
```

---

# 🚀 Application Workflow

```
User
   │
   ▼
Frontend (HTML/CSS/JS)
   │
HTTP Requests
   │
   ▼
Spring Boot REST API
   │
JWT Authentication
   │
   ▼
MongoDB Atlas
```

---

# 🔑 Authentication Flow

```
Signup
    │
    ▼
Store User in MongoDB
    │
    ▼
Login
    │
    ▼
Generate JWT Token
    │
    ▼
Frontend Stores Token
    │
    ▼
Token Sent with Every API Request
    │
    ▼
Spring Security Validates Token
    │
    ▼
Authorized Access
```

---

# 📡 REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |

---

## Notes

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/notes` | Get all user notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/{id}` | Update note |
| DELETE | `/api/notes/{id}` | Delete note |

---

# 💾 Database

MongoDB Atlas stores:

### User Collection

```json
{
  "_id": "...",
  "username": "john",
  "email": "john@example.com",
  "password": "******"
}
```

### Notes Collection

```json
{
  "_id": "...",
  "username": "john",
  "title": "",
  "content": "Complete DBMS Assignment",
  "color": "#FFD54F",
  "category": "Study",
  "time": "2026-07-05",
  "pinned": false,
  "x": 120,
  "y": 180
}
```

---

# 🔒 Security

- JWT Authentication
- Protected REST APIs
- User-specific Data Access
- Authentication Filter
- Spring Security Integration

---

# 🎯 Future Improvements

- Rich Text Editor
- Image Attachments
- Note Sharing
- Archive Notes
- Trash Bin
- Labels & Tags
- Reminder Notifications
- Note Lock (PIN)
- Markdown Support
- Mobile App
- PWA Support

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/sticky-notes.git
```

---

## Backend

```bash
cd backend
```

Configure your MongoDB Atlas connection inside:

```
application.properties
```

Run:

```bash
mvn spring-boot:run
```

---

## Frontend

Open

```
login.html
```

using Live Server or any local web server.

---

# 📈 Learning Outcomes

This project demonstrates practical implementation of:

- Full Stack Web Development
- REST API Development
- Authentication using JWT
- Spring Security
- MongoDB Atlas Integration
- CRUD Operations
- Responsive UI Design
- Client-Server Communication
- JavaScript DOM Manipulation
- Secure User Authentication

---

# 🤝 Contributing

Contributions, feature suggestions, and improvements are always welcome.

Feel free to fork this repository and submit a Pull Request.

---

# 👨‍💻 Author

**Yashwanth E S**

Computer Science Engineering Student

GitHub: https://github.com/your-username

LinkedIn: https://linkedin.com/in/your-profile

Portfolio: https://your-portfolio-link

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps the project reach more developers.

---

# 📜 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for more information.

---

## 🙏 Acknowledgements

- Spring Boot
- MongoDB Atlas
- Spring Security
- JWT
- Maven
- HTML5
- CSS3
- JavaScript
- GitHub

