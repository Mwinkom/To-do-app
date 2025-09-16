"use strict";
const selectLabel = document.querySelector(".select-label");
const dropdown = document.querySelector("#categories");
const closeButton = document.querySelector(".close-btn");
const modalContainer = document.querySelector(".modal-container");
const addNewTask = document.querySelector(".add-task-btn");
const categories = document.getElementById("categories");
const addButton = document.getElementById("add-btn");
const addTask = document.getElementById("add-modal-btn");
const pendingTaskContainer = document.querySelector(".pending-task-wrapper");
const completedTaskContainer = document.querySelector('.completed-task-wrapper');
const pendingSection = document.getElementById('pending-container');
const completedSection = document.getElementById('completed-container');
const filledState = document.querySelector(".filled-state");
const emptyState = document.querySelector(".empty-state");
const descriptionErrorText = document.querySelector(".description-error");
const categoryErrorText = document.querySelector(".category-error");
const dateErrorText = document.querySelector(".date-error");
const description = document.getElementById("task-input");
const category = document.querySelector(".select-label");
const date = document.getElementById("date");
const clearAllBtn = document.getElementById('clear-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.querySelector('.search-btn');
const searchNotFound = document.querySelector('.no-search-found');
let isValid = true;
let categoryValue;
let pendingTasks = JSON.parse(localStorage.getItem("taskList")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
class Task {
    constructor(description, category, date) {
        this.description = description;
        this.category = category;
        this.date = date;
    }
}
categories.addEventListener("click", (e) => {
    const target = e.target;
    categoryValue = target.textContent;
});
clearAllBtn.addEventListener('click', () => {
    console.log('Clear button clicked');
    localStorage.removeItem('completedTasks');
    completedTasks = [];
    renderTasks(pendingTasks, completedTasks);
    feedbackToast('All completed tasks have been cleared!');
});
pendingTaskContainer.addEventListener("click", (e) => {
    if (e.target.closest(".delete-btn")) {
        const taskDescription = getTaskDescription(e);
        pendingTasks = pendingTasks.filter((task) => task.description !== taskDescription);
        storePendingTasks();
        renderTasks(pendingTasks, completedTasks);
        feedbackToast("Your task was deleted successfully");
    }
});
pendingTaskContainer.addEventListener("change", (e) => {
    let checkBox = e.target.closest(".todo-task");
    if (checkBox.checked) {
        if (checkBox) {
            const taskDescription = getTaskDescription(e);
            let [filteredTask] = pendingTasks.filter(task => task.description == taskDescription);
            if (filteredTask) {
                completedTasks.push(filteredTask);
            }
            pendingTasks = pendingTasks.filter(task => task.description !== taskDescription);
            storeCompletedTasks();
            storePendingTasks();
            renderTasks(pendingTasks, completedTasks);
            feedbackToast('Congratulations, you completed your task!');
        }
    }
});
completedTaskContainer.addEventListener("click", (e) => {
    if (e.target.closest(".delete-btn")) {
        const taskDescription = getTaskDescription(e);
        completedTasks = completedTasks.filter((task) => task.description !== taskDescription);
        storeCompletedTasks();
        renderTasks(pendingTasks, completedTasks);
        feedbackToast("Your task was deleted successfully");
    }
});
searchBtn.addEventListener('click', () => {
    const searchValue = searchInput.value.toLowerCase();
    console.log(`Search Value: ${searchValue}`);
    searchFilter(searchValue);
});
addTask.addEventListener("click", () => {
    const descriptionValue = description.value;
    const dateValue = date.value;
    isValid = true;
    console.log(`Task Description: ${descriptionValue}`);
    console.log(`Date Value: ${dateValue}`);
    console.log(`Category Value: ${categoryValue}`);
    formValidator(dateValue, descriptionValue);
    if (isValid === false)
        return;
    addUserTask(descriptionValue, categoryValue, dateValue);
    clearForm();
});
addNewTask.addEventListener("click", () => {
    modalContainer.classList.add("active-modal");
});
closeButton.addEventListener("click", () => {
    closeModal();
});
modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
        closeModal();
    }
});
selectLabel.addEventListener("click", () => {
    selectLabel.classList.toggle("active");
    dropdown.classList.toggle("show");
});
addButton.addEventListener("click", () => {
    addNewTask.click();
});
document.addEventListener("DOMContentLoaded", () => {
    retrievePendingTasks();
    renderTasks(pendingTasks, completedTasks);
});
// Handle selecting an option
dropdown.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
        selectLabel.querySelector("p").textContent = item.textContent;
        selectLabel.classList.remove("active");
        dropdown.classList.remove("show");
    });
});
searchInput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        searchBtn.click();
    }
});
searchInput.addEventListener('input', () => {
    if (searchInput.value === '') {
        renderTasks(pendingTasks, completedTasks);
    }
});
//Add new Task
function addUserTask(descriptionInput, categoryInput, dateInput) {
    const myTask = new Task(descriptionInput, categoryInput, dateInput);
    pendingTasks.push(myTask);
    storePendingTasks();
    renderTasks(pendingTasks, completedTasks);
    feedbackToast("New task added successfully!");
    modalContainer.classList.remove("active-modal");
}
//Form Validation
function formValidator(dateInput, descriptionInput) {
    if (descriptionInput.trim() === "") {
        descriptionErrorText.classList.remove("hidden");
        description.classList.add("error");
        isValid = false;
    }
    else {
        descriptionErrorText.classList.add("hidden");
        description.classList.remove("error");
    }
    if (dateInput.trim() === "") {
        dateErrorText.classList.remove("hidden");
        date.classList.add("error");
        isValid = false;
    }
    else {
        dateErrorText.classList.add("hidden");
        date.classList.remove("error");
    }
    if (categoryValue === undefined || categoryValue === "") {
        categoryErrorText.classList.remove("hidden");
        category.classList.add("error");
        isValid = false;
    }
    else {
        categoryErrorText.classList.add("hidden");
        category.classList.remove("error");
    }
}
function clearForm() {
    description.value = "";
    date.value = "";
    categoryValue = "";
    category.querySelector("p").textContent = "Select Category";
}
function closeModal() {
    modalContainer.classList.remove("active-modal");
    clearForm();
}
function storePendingTasks() {
    localStorage.setItem("taskList", JSON.stringify(pendingTasks));
    console.log(localStorage);
}
function retrievePendingTasks() {
    pendingTasks = JSON.parse(localStorage.getItem("taskList")) || [];
    console.log(pendingTasks);
}
function storeCompletedTasks() {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    console.log(localStorage);
}
function retrieveCompletedTasks() {
    completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
    console.log(completedTasks);
}
function renderTasks(pTasks, cTasks) {
    pendingTaskContainer.innerHTML = "";
    completedTaskContainer.innerHTML = "";
    if (typeof completedTasks === 'null') {
        filledState.classList.remove("hidden");
        completedSection.classList.add("hidden");
        emptyState.classList.add("hidden");
        pendingSection.classList.remove("hidden");
        return;
    }
    pTasks.forEach((task) => {
        const taskRow = ` <div class="todo-task-row">
                        <div class="left">
                            <div class="task">
                                <input type="checkbox" id="todo-task-1" class="todo-task">
                                <label class="task-text" for="todo-task-1">${task.description}</label>
                            </div>
                            <div class="meta">
                                <p class="category">${task.category}</p>
                                <p class="date">${task.date}</p>
                            </div>
                        </div>
                        <button class="delete-btn">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>`;
        pendingTaskContainer.innerHTML += taskRow;
    });
    cTasks.forEach((task) => {
        const completedTaskRow = `<div class="todo-task-row">
                                <div class="left">
                                    <div class="task">
                                        <img src="../assets/images/check-mark.png" alt="">
                                        <p class="task-text" for="todo-task-1">${task.description}</p>
                                    </div>
                                    <div class="meta">
                                        <p class="category">${task.category}</p>
                                        <p class="date">${task.date}</p>
                                    </div>
                                </div>
                                <button class="delete-btn">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>`;
        completedTaskContainer.innerHTML += completedTaskRow;
    });
    if (pTasks.length == 0 && cTasks.length == 0) {
        filledState.classList.add("hidden");
        emptyState.classList.remove("hidden");
        searchNotFound.classList.add('hidden');
    }
    else if (pTasks.length == 0 && cTasks.length > 0) {
        filledState.classList.remove("hidden");
        completedSection.classList.remove("hidden");
        pendingSection.classList.add("hidden");
        emptyState.classList.remove("hidden");
        searchNotFound.classList.add('hidden');
        emptyState.classList.add('no-padding');
        filledState.style.gap = '20px';
    }
    else if (cTasks.length == 0 && pTasks.length > 0) {
        filledState.classList.remove("hidden");
        completedSection.classList.add("hidden");
        emptyState.classList.add("hidden");
        pendingSection.classList.remove("hidden");
        searchNotFound.classList.add('hidden');
    }
    else {
        filledState.classList.remove("hidden");
        completedSection.classList.remove("hidden");
        pendingSection.classList.remove("hidden");
        emptyState.classList.add("hidden");
        filledState.style.gap = '40px';
        searchNotFound.classList.add('hidden');
    }
}
function feedbackToast(message) {
    const feedbackMessage = document.querySelector(".feedback-message");
    const feedbackToast = document.querySelector(".feedback-toast");
    feedbackMessage.textContent = message;
    feedbackToast.classList.add("show");
    setTimeout(() => {
        feedbackToast.classList.remove("show");
    }, 3000);
}
function getTaskDescription(event) {
    let taskRow = event.target.closest(".todo-task-row");
    let taskDescription = taskRow.querySelector(".task-text").textContent;
    return taskDescription;
}
function searchFilter(value) {
    const filteredPendingTasks = pendingTasks.filter(task => task.description.toLowerCase().includes(value) || task.category.toLowerCase() === value);
    const filteredCompletedTasks = completedTasks.filter(task => task.description.toLowerCase().includes(value) || task.category.toLowerCase() === value);
    if (filteredPendingTasks.length == 0 && filteredCompletedTasks == 0) {
        filledState.classList.add('hidden');
        searchNotFound.classList.remove('hidden');
        emptyState.classList.add('hidden');
        return;
    }
    renderTasks(filteredPendingTasks, filteredCompletedTasks);
    emptyState.classList.add('hidden');
}
