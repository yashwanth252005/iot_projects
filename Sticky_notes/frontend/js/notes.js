// ===============================
// CONFIG
// ===============================

const token = localStorage.getItem(CONFIG.TOKEN_KEY);

if (!token) {
  window.location.href = "login.html";
}

let notes = [];

// ===============================
// LOAD CURRENT USER
// ===============================

function renderCurrentUser() {
  const label = document.getElementById("currentUserLabel");

  if (label) {
    label.textContent = localStorage.getItem(CONFIG.USER_KEY);
  }
}

// ===============================
// LOAD NOTES
// ===============================

async function loadNotes() {
  try {
    const response = await fetch(
      `${CONFIG.API_BASE_URL}/notes`,

      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    if (!response.ok) {
      alert("Unable to load notes");

      return;
    }

    notes = await response.json();

    renderNotes();
  } catch (e) {
    console.error(e);
  }
}

// ===============================
// CREATE NOTE
// ===============================

async function createNote() {
  const note = {
    title: "",

    content: "",

    color: "#e6b8d5",

    category: "General",

    time: new Date().toLocaleString(),

    pinned: false,

    x: 50,

    y: 50,
  };

  try {
    await fetch(
      `${CONFIG.API_BASE_URL}/notes`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + token,
        },

        body: JSON.stringify(note),
      },
    );

      await loadNotes();
      
      setTimeout(()=>{

    const textareas =
    document.querySelectorAll("textarea");

    if(textareas.length){

        textareas[textareas.length-1].focus();

    }

      }, 200);
      
  } catch (e) {
    console.error(e);
  }
}

// ===============================
// RENDER NOTES
// ===============================

function renderNotes() {
  const container = document.getElementById("notesContainer");

    container.innerHTML = "";
    
    notes.sort((a,b)=>b.pinned-a.pinned);

  (notes || []).forEach((note) => {
    const div = document.createElement("div");

    div.className = "note";

    div.style.left = note.x + "px";

    div.style.top = note.y + "px";

    div.style.background = note.color;

    div.innerHTML = `

        <div class="note-header">

<button onclick="togglePin('${note.id}')">

${note.pinned ? "📌" : "📍"}

</button>

<select onchange="changeCategory('${note.id}',this.value)">

<option value="General" ${note.category == "General" ? "selected" : ""}>General</option>

<option value="Work" ${note.category == "Work" ? "selected" : ""}>Work</option>

<option value="Study" ${note.category == "Study" ? "selected" : ""}>Study</option>

<option value="Ideas" ${note.category == "Ideas" ? "selected" : ""}>Ideas</option>

<option value="Personal" ${note.category == "Personal" ? "selected" : ""}>Personal</option>

</select>

        <button onclick="deleteNote('${note.id}')"> ❌ </button>

        </div>

        <textarea oninput="updateNote('${note.id}',this.value)" >${note.content}</textarea>

        <div class="note-footer">

            <input type="color"

            value="${note.color}" onchange="changeColor('${note.id}',this.value)">

            <small>${note.time}

            </small>

        </div>

        `;

    container.appendChild(div);

    makeDraggable(div, note);
  });
}

let saveTimers = {};

function updateNote(id, content) {
  const note = notes.find((n) => n.id === id);

  if (!note) return;

  note.content = content.trimStart();

  note.time = new Date().toLocaleString();

  if (saveTimers[id]) {
    clearTimeout(saveTimers[id]);
  }

  saveTimers[id] = setTimeout(() => {
    saveNote(note);
  }, 500);
}

async function saveNote(note) {
  try {
    await fetch(
      `${CONFIG.API_BASE_URL}/notes/${note.id}`,

      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + token,
        },

        body: JSON.stringify(note),
      },
    );
  } catch (e) {
    console.log(e);
  }
}

function searchNotes() {

    const query = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const categoryFilter =
        document.getElementById("categoryFilter").value;

    const filtered = notes.filter(note => {

        const matchesText =
            note.content.toLowerCase().includes(query);

        const matchesCategory =
            categoryFilter === "all" ||
            note.category === categoryFilter;

        return matchesText && matchesCategory;

    });

    renderFilteredNotes(filtered);

}

function renderFilteredNotes(filtered){

    const oldNotes = notes;

    notes = filtered;

    renderNotes();

    notes = oldNotes;

}

async function deleteNote(id) {
  if (!confirm("Delete this note?")) return;

  try {
    await fetch(
      `${CONFIG.API_BASE_URL}/notes/${id}`,

      {
        method: "DELETE",

        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    notes = notes.filter((n) => n.id !== id);

    renderNotes();
  } catch (e) {
    console.log(e);
  }
}

function changeColor(id,color){

    const note=notes.find(n=>n.id===id);

    if(!note)
        return;

    note.color=color;

    note.time=new Date().toLocaleString();

    saveNote(note);

    renderNotes();

}

function changeColor(id,color){

    const note=notes.find(n=>n.id===id);

    if(!note)
        return;

    note.color=color;

    note.time=new Date().toLocaleString();

    saveNote(note);

    renderNotes();

}

function togglePin(id){
    const note=notes.find(n=>n.id===id);

    if(!note)
        return;

    note.pinned=!note.pinned;

    note.time=new Date().toLocaleString();

    saveNote(note);

    renderNotes();
}

function makeDraggable(noteElement, note) {
  let isDragging = false;

  let offsetX = 0;
  let offsetY = 0;

  noteElement.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "TEXTAREA") return;

    isDragging = true;

    const rect = noteElement.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    noteElement.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const container = document.getElementById("notesContainer");
    const containerRect = container.getBoundingClientRect();

    const x = e.clientX - containerRect.left - offsetX;
    const y = e.clientY - containerRect.top - offsetY;

    noteElement.style.left = x + "px";
    noteElement.style.top = y + "px";
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;

    noteElement.style.zIndex = 1;

    note.x = noteElement.offsetLeft;
    note.y = noteElement.offsetTop;

    saveNote(note);
  });
}

// ===============================
// START APP
// ===============================

window.onload = async () => {
  renderCurrentUser();

    await loadNotes();
    
    document
.getElementById("searchInput")
.addEventListener("input",searchNotes);

document
.getElementById("categoryFilter")
.addEventListener("change",searchNotes);
};
