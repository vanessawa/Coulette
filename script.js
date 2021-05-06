/*
 */

// saved colors of coulette
const colors = [];

// current generated color
let currentColor = undefined;

// local store
const storageKey = "colors";

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

// change color in header by click
function changeColor() {
  currentColor = randomHexColor();

  const colorValueEl = document.querySelector("#colorValue");
  colorValueEl.textContent = currentColor;

  const body = document.querySelector("#header");
  body.style.backgroundColor = currentColor;

  updateSaveButtonStatus();
}

// click-event generate color
const generateBtn = document.querySelector("#generateBtn");
generateBtn.addEventListener("click", changeColor);

// execute function changeColor
changeColor();

// create list-item for saved color
function createColorElementInList(color) {
  const colorList = document.querySelector("#colors");
  const newColor = document.createElement("li");

  newColor.innerText = color;
  newColor.style.backgroundColor = color;
  newColor.setAttribute("data-color", color);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete Color";
  deleteButton.style.marginLeft = "5px";

  newColor.appendChild(deleteButton);
  colorList.appendChild(newColor);
}

// save the generated color to List
function saveColor() {
  if (!colors.includes(currentColor)) {
    colors.push(currentColor);
    createColorElementInList(currentColor);
    updateSaveButtonStatus();
    saveColorsToLocalStorage();
  }
}

// click-event save color
const saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", saveColor);

// update save button when colors saved
function updateSaveButtonStatus() {
  const saveButton = document.querySelector("#saveBtn");
  if (colors.includes(currentColor)) {
    saveButton.setAttribute("disabled", "");
  } else {
    saveButton.removeAttribute("disabled");
  }
}

// delete color from list

function deleteColor(event) {
  const listItem = event.target.parentElement;
  const color = listItem.getAttribute("data-color");

  deleteColorFromArray(color);
  colorList.removeChild(listItem);
}

// click-event delete color from list
const colorList = document.querySelector("#colors");
colorList.addEventListener("click", deleteColor);

// delete color from colors array

function deleteColorFromArray(color) {
  const index = colors.indexOf(color);
  colors.splice(index, 1);

  updateSaveButtonStatus();
  saveColorsToLocalStorage();
}

// put saved colors to local storage
function saveColorsToLocalStorage() {
  const jsonColors = JSON.stringify(colors);
  localStorage.setItem(storageKey, jsonColors);
}

// reload saved colors
function readColorsFromLocalStorage() {
  const storageColors = localStorage.getItem(storageKey);
  if (storageColors !== null) {
    const savedColors = JSON.parse(storageColors);
    savedColors.forEach((color) => {
      createColorElementInList(color);
      colors.push(color);
    });
  }
}

readColorsFromLocalStorage();
