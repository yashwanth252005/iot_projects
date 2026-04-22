// Get current user
function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

// Get all notes data
function getAllNotes() {
  return JSON.parse(localStorage.getItem("notes")) || {};
}

// Save all notes
function saveAllNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Get notes for current user
function getUserNotes() {
  const user = getCurrentUser();
  const allNotes = getAllNotes();
  return allNotes[user] || [];
}

// Save notes for current user
function saveUserNotes(userNotes) {
  const user = getCurrentUser();
  let allNotes = getAllNotes();

  allNotes[user] = userNotes;
  saveAllNotes(allNotes);
}

// Create new note
function createNote() {
  const existingNotes = getUserNotes();
  const offset = existingNotes.length * 18;

  const noteObj = {
    id: Date.now(),
    content: "",
    color: "#e6b8d5",
    time: new Date().toLocaleString(),
    pinned: false,
    category: "General",
    x: 40 + offset,
    y: 20 + offset
  };

  existingNotes.push(noteObj);
  saveUserNotes(existingNotes);

  renderNotes();
}


// Render all notes
function renderNotes(filteredNotes) {
  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  let notes = filteredNotes || getUserNotes();

  // Pinned notes first
  notes.sort((a, b) => b.pinned - a.pinned);

  notes.forEach(note => {
    const noteEl = document.createElement("div");
    noteEl.className = "note";
    noteEl.style.top = note.y + "px";
    noteEl.style.left = note.x + "px";
    noteEl.style.background = note.color;

    noteEl.innerHTML = `
      <div class="note-header">
        <button title="Pin note" onclick="togglePin(${note.id})">${note.pinned ? "📌" : "📍"}</button>
        <select class="note-category" onchange="changeCategory(${note.id}, this.value)">
          <option value="General" ${note.category === "General" ? "selected" : ""}>General</option>
          <option value="Work" ${note.category === "Work" ? "selected" : ""}>Work</option>
          <option value="Personal" ${note.category === "Personal" ? "selected" : ""}>Personal</option>
          <option value="Ideas" ${note.category === "Ideas" ? "selected" : ""}>Ideas</option>
          <option value="Study" ${note.category === "Study" ? "selected" : ""}>Study</option>
        </select>
        <button onclick="deleteNote(${note.id})">❌</button>
      </div>

      <textarea oninput="updateNote(${note.id}, this.value)">${note.content}</textarea>

      <div class="note-footer">
        <input type="color" value="${note.color}" onchange="changeColor(${note.id}, this.value)">
        <div class="note-meta">
          <span class="category-badge">${note.category || "General"}</span>
          <small>${note.time}</small>
        </div>
      </div>
    `;

    makeDraggable(noteEl, note.id);
    container.appendChild(noteEl);
  });
}

// Delete note
function deleteNote(id) {
  let notes = getUserNotes();

  notes = notes.filter(note => note.id !== id);

  saveUserNotes(notes);
  renderNotes();
}

// Load notes on page load
window.addEventListener("load", renderNotes);



function makeDraggable(noteEl, id) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  const container = document.getElementById("notesContainer");

  noteEl.addEventListener("mousedown", (e) => {
  if (e.target.tagName === "TEXTAREA") return;

  isDragging = true;

  const containerRect = container.getBoundingClientRect();

  offsetX = e.clientX - containerRect.left - noteEl.offsetLeft;
  offsetY = e.clientY - containerRect.top - noteEl.offsetTop;

  noteEl.style.zIndex = 1000;
});

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const containerRect = container.getBoundingClientRect();
    const maxX = container.clientWidth - noteEl.offsetWidth;
    const maxY = container.clientHeight - noteEl.offsetHeight;

    const x = Math.min(Math.max(e.clientX - containerRect.left - offsetX, 0), maxX);
    const y = Math.min(Math.max(e.clientY - containerRect.top - offsetY, 0), maxY);

    noteEl.style.left = x + "px";
    noteEl.style.top = y + "px";
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      noteEl.style.zIndex = 1;

      savePosition(id, noteEl.offsetLeft, noteEl.offsetTop);
    }
  });
}


function savePosition(id, x, y) {
  let notes = getUserNotes();

  notes = notes.map(note => {
    if (note.id === id) {
      note.x = x;
      note.y = y;
    }
    return note;
  });

  saveUserNotes(notes);
}



// Change color
function changeColor(id, color) {
  let notes = getUserNotes();

  notes = notes.map(note => {
    if (note.id === id) {
      note.color = color;
    }
    return note;
  });

  saveUserNotes(notes);
  renderNotes();
}

// Pin note
function togglePin(id) {
  let notes = getUserNotes();

  notes = notes.map(note => {
    if (note.id === id) {
      note.pinned = !note.pinned;
    }
    return note;
  });

  saveUserNotes(notes);
  renderNotes();
}

function updateNote(id, content) {
  let notes = getUserNotes();

  notes = notes.map(note => {
    if (note.id === id) {
      note.content = content;
      note.time = new Date().toLocaleString();
    }
    return note;
  });

  saveUserNotes(notes);
}

function changeCategory(id, category) {
  let notes = getUserNotes();

  notes = notes.map(note => {
    if (note.id === id) {
      note.category = category;
      note.time = new Date().toLocaleString();
    }
    return note;
  });

  saveUserNotes(notes);
  searchNotes();
}


function searchNotes() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const selectedCategory = document.getElementById("categoryFilter").value;
  const notes = getUserNotes();

  const filtered = notes.filter(note => {
    const noteText = note.content.toLowerCase();
    const matchesQuery = noteText.includes(query);
    const category = note.category || "General";
    const matchesCategory = selectedCategory === "all" || selectedCategory === category;

    return matchesQuery && matchesCategory;
  });

  renderNotes(filtered);
}

function renderCurrentUser() {
  const userLabel = document.getElementById("currentUserLabel");
  const user = getCurrentUser();

  if (userLabel) {
    userLabel.textContent = user || "Guest";
  }
}

window.addEventListener("load", renderCurrentUser);