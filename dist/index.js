"use strict";
const form = document.querySelector("#grocery-form");
const input = document.querySelector("#grocery-input");
const addButton = form.querySelector("button");
const list = document.querySelector("#grocery-list");
const clearButton = document.querySelector("#clear-list");
const filterInput = document.querySelector("#filter");
form.addEventListener("submit", onSaveGrocery);
clearButton.addEventListener("click", onClearList);
list.addEventListener("click", onClickRemoveGrocery);
filterInput.addEventListener("input", onFilterGroceries);
document.addEventListener('DOMContentLoaded', onDisplayGroceries);
function onSaveGrocery(e) {
    e.preventDefault();
    const grocery = input.value;
    if (grocery.trim().length > 0) {
        addGroceryToDOM(grocery);
        addToStorage(grocery);
    }
    input.value = "";
}
// lägg till inköp till dom
function addGroceryToDOM(grocery) {
    const item = document.createElement('li');
    item.appendChild(document.createTextNode(grocery));
    item.appendChild(createIconButton('btn-remove text-red'));
    list.appendChild(item);
}
function createIconButton(classes) {
    const button = document.createElement("button");
    button.className = classes;
    button.appendChild(createIcon("fa-regular fa-trash-can"));
    return button;
}
;
function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}
;
function onClearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    ;
}
;
function onClickRemoveGrocery(e) {
    var _a;
    const target = e.target;
    if ((_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains("btn-remove")) {
        const item = target.parentElement.parentElement;
        removeGrocery(item);
    }
}
function removeGrocery(item) {
    item.remove();
}
function onFilterGroceries() {
    var _a, _b;
    const value = this.value;
    const groceries = document.querySelectorAll("li");
    for (let grocery of groceries) {
        const item = (_b = (_a = grocery.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        if ((item === null || item === void 0 ? void 0 : item.indexOf(value)) !== -1) {
            grocery.style.display = "flex";
        }
        else {
            grocery.style.display = "none";
        }
    }
}
function addToStorage(grocery) {
    // Hämta ut listan om den finns i localstorage...
    const groceries = getFromStorage();
    // Om den finns lägger till grocery
    groceries.push(grocery);
    // Spara listan igen till localstorage
    localStorage.setItem('groceries', JSON.stringify(groceries));
}
function getFromStorage() {
    var _a;
    let items;
    items = (_a = JSON.parse(localStorage.getItem('groceries'))) !== null && _a !== void 0 ? _a : [];
    return items;
}
function removeFromStorage(grocery) {
    let groceries = getFromStorage();
    groceries = groceries.filter((item) => item !== grocery);
    localStorage.setItem('groceries', JSON.stringify(groceries));
}
function onDisplayGroceries() {
    const groceries = getFromStorage();
    groceries.forEach((item) => addGroceryToDOM(item));
}
