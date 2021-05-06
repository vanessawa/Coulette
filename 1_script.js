// TODO: Kommentare mit Leerzeichen anfangen (Sorry)
// Variablen
const generateBtn = document.querySelector("#generateBtn");
const saveBtn = document.querySelector("#saveBtn");
// TODO: ID nutzen
// Zur identifizierung von Elementen IDs verwenden
const initHeadColor = document.querySelector("header");

// Entscheide dich für eine globale variable
// die du für die aktuell generierte farbe nutzen möchtest
// TODO: Variablen immer initialisieren mit wert
let headColor; // = undefined;
let currentColor = null;

let colors = [];
const colorValue = document.querySelector("#typoColor");
// Der text soll "undefined" sein ??
colorValue.textContent = headColor;

//init change
changeColor();
restoreFromLocal();
colors.forEach(restoreList);

//change color im header

// JSDoc kommentar format

/**
 * This function creates a new color and sets the heads background color
 */
function changeColor() {
  const header = document.querySelector("header");
  // TODO: ungenutzte Variable
  const currentBackgroundColor = header.style.backgroundColor.toLowerCase();

  headColor = randomHexColor();
  header.style.backgroundColor = headColor;
  colorValue.textContent = headColor;
  updateSaveButtonStatus();
}

/**
 * Toggle color of header
 * Generate random number between min and max
 */
function randomNumber(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return Math.floor(num);
}

/**
 * Generate random hex number for color
 */
function randomHexNumber() {
  let hex = randomNumber(0, 255).toString(16);
  if (hex.length === 1) {
    hex = "0" + hex;
  }
  return hex;
}

/**
 * Generate random hex color
 */
function randomHexColor() {
  const red = randomHexNumber();
  const green = randomHexNumber();
  const blue = randomHexNumber();

  return ("#" + red + green + blue).toUpperCase();
}

// TODO: funktion nochmal löschen und neu schreiben
//save display color to list
function saveColor() {
  const currentHeader = document.querySelector("#typoColor");
  // ungenutzer code
  const currentBgColor = currentHeader.style.backgroundColor.toLowerCase();
  const list = document.querySelector("#colors");
  const li = document.createElement("li");
  li.setAttribute("data-color", headColor);

  currentColor = headColor;

  //duplicate check
  // TODO: unnötig
  updateSaveButtonStatus();

  //kein doppelter Farbwert ins array zufügen
  let check = colors.includes(currentColor);
  // TODO: prüfung schon ganz oben in der Funktion machen
  if (check === false) {
    colors.push(headColor);
    list.appendChild(li);
    li.textContent = headColor;
    li.style.backgroundColor = headColor;
    li.style.marginBottom = "5px";

    // TODO: duplicate check sollte hier stattfinden
  }
  updateSaveButtonStatus();

  //Daten in JSON ablegen
  saveLocal();

  //delete button
  // TODO: Delete Button nur erzeugen, wenn das Listen-Element auch gebraucht wird
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", deleteColor);
  li.appendChild(deleteBtn);
  //apppendChild immer nach innerText!!
}

//update saveButton
function updateSaveButtonStatus() {
  const saveBtn = document.querySelector("#saveBtn");
  // TODO: Unused variable
  const list = document.querySelector("#colors");
  let check = colors.includes(headColor);

  if (check === true) {
    saveBtn.setAttribute("disabled", "");
  } else {
    saveBtn.removeAttribute("disabled");
  }
}

//delete color
function deleteColor(event) {
  let deleteElement = event.target.parentElement;
  // TODO: unused variable
  let colorValue = deleteElement.getAttribute("data-color");

  //delete from List
  deleteElement.remove();

  //delete from array
  //deleteColorIndex = colors.indexOf(deleteElement);
  //colors.splice(deleteColorIndex, 1);
  const index = colors.indexOf(event);
  colors.splice(index, 1);

  //re-enable after delete color
  updateSaveButtonStatus();

  //Daten in JSON ablegen
  saveLocal();
}

//buttons
generateBtn.addEventListener("click", changeColor);
saveBtn.addEventListener("click", saveColor);

/*
Local Storage
- Daten aus Array mit JSON ablegen
- Bei Neuaufruf der Seite JSON neu auslesen
- Liste neu generiern
*/

// TODO: kind beim namen nennen --> saveColorsToLocalStorage
function saveLocal() {
  // Unnötig
  // const colorID = colors;
  localStorage.setItem("arr", JSON.stringify(colors));
}

// TODO: name der funktion anpassen, sprechenderen Namen finden
function restoreFromLocal() {
  let colorsFromStorage = JSON.parse(localStorage.getItem("arr"));
  if (colorsFromStorage !== null) {
    colors = colorsFromStorage;
  }
}

function restoreList(color) {
  // TODO: duplizierten Code in Funktion auslagern

  const list = document.querySelector("#colors");
  const li = document.createElement("li");

  li.setAttribute("data-color", color);

  //kein doppelter Farbwert ins array zufügen
  list.appendChild(li);
  li.textContent = color;
  li.style.backgroundColor = color;
  li.style.marginBottom = "5px";

  updateSaveButtonStatus();

  //Daten in JSON ablegen
  saveLocal();

  //delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", deleteColor);
  li.appendChild(deleteBtn);
  //apppendChild immer nach innerText!!
}
