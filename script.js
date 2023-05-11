let add = document.querySelector(".add");
let main = document.querySelector(".main");
let data = [];

// Load data from local storage
for (let i = localStorage.length-1; i>=0; i--) {
  let key = localStorage.key(i);
  if (key.startsWith("note-")) {
    let value = localStorage.getItem(key);
    createNoteFromData(value, key);
  }
}

add.addEventListener("click", function() {
  let note = document.createElement("div");
  note.classList.add("notes");
  note.innerHTML = `
    <div class="tool">
      <i class="save fa-sharp fa-solid fa-floppy-disk" style="color: #fcfcfc;" class="button"></i>
      <i class="trash fa-solid fa-trash" style="color: #fffafa;" class="button"></i>
    </div>
    <textarea></textarea>
  `;
  main.appendChild(note);

  // Add event listener to the trash icon to remove the note
  let trashIcon = note.querySelector(".trash");
  trashIcon.addEventListener("click", function() {
    let id = trashIcon.dataset.id;
    localStorage.removeItem(id);
    note.remove();
  });

  // Add event listener to the save icon to save the note
  let saveIcon = note.querySelector(".save");
  saveIcon.addEventListener("click", function() {
    let textarea = note.querySelector("textarea");
    let value = textarea.value;
    let id = `note-${Date.now()}`;
  
    localStorage.setItem(id, JSON.stringify(value));
    saveIcon.dataset.id = id;
   
  });
});

// Function to create a note from loaded data
function createNoteFromData(value, id) {
  let note = document.createElement("div");
  note.classList.add("notes");
  note.innerHTML = `
    <div class="tool">
      <i class="save fa-sharp fa-solid fa-floppy-disk" style="color: #fcfcfc;" class="button" data-id="${id}"></i>
      <i class="trash fa-solid fa-trash" style="color: #fffafa;" class="button" data-id="${id}"></i>
    </div>
    <textarea>${value}</textarea>
  `;
  main.appendChild(note);

  // Add event listener to the trash icon to remove the note
  let trashIcon = note.querySelector(".trash");
  trashIcon.addEventListener("click", function() {
    let id = trashIcon.dataset.id;
    localStorage.removeItem(id);
    note.remove();
  });

  // Add event listener to the save icon to save the note
  let saveIcon = note.querySelector(".save");
  saveIcon.addEventListener("click", function() {
    let textarea = note.querySelector("textarea");
    let value = textarea.value;
    let id = `note-${Date.now()}`;
    
    localStorage.setItem(id, JSON.stringify(value));
    saveIcon.dataset.id = id;
  
  });
}
