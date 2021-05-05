//Variablen
const generateBtn = document.querySelector("#generateBtn");
const saveBtn = document.querySelector("#saveBtn");
const initHeadColor = document.querySelector("header");
let headColor;
let colors = [];
let currentColor = null;
const colorValue = document.querySelector("#typoColor");
colorValue.textContent = headColor;

//init change
changeColor();
restoreFromLocal();
colors.forEach(restoreList);

//change color im header
function changeColor() {
  const header = document.querySelector("header");
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

//save display color to list
function saveColor() {
  const currentHeader = document.querySelector("#typoColor");
  const currentBgColor = currentHeader.style.backgroundColor.toLowerCase();
  const list = document.querySelector("#colors");
  const li = document.createElement("li");
  li.setAttribute("data-color", headColor);

  currentColor = headColor;

  //duplicate check
  let check = colors.includes(currentColor);
  updateSaveButtonStatus();

  //kein doppelter Farbwert ins array zufügen
  if (check === false) {
    colors.push(headColor);
    list.appendChild(li);
    li.textContent = headColor;
    li.style.backgroundColor = headColor;
    li.style.marginBottom = "5px";
  }
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

//update saveButton
function updateSaveButtonStatus() {
  const saveBtn = document.querySelector("#saveBtn");
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

function saveLocal() {
  const colorID = colors;
  localStorage.setItem("arr", JSON.stringify(colorID));
}

function restoreFromLocal() {
  let colorsFromStorage = JSON.parse(localStorage.getItem("arr"));
  if (colorsFromStorage !== null) {
    colors = colorsFromStorage;
  }
}

function restoreList(color) {
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
