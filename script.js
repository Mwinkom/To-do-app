const selectLabel = document.querySelector(".select-label");
const dropdown = document.querySelector("#categories");
const closeButton = document.querySelector(".close-btn");
const modalContainer = document.querySelector(".modal-container");
const addNewTask = document.querySelector(".add-task-btn");
const categories = document.getElementById("categories");
const addButton = document.getElementById("add-btn");
const addTask = document.getElementById("add-modal-btn");
const pendingTaskContainer = document.querySelector(".pending-task-wrapper");
const filledState = document.querySelector(".filled-state");
const emptyState = document.querySelector(".empty-state");
const descriptionErrorText = document.querySelector(".description-error");
const categoryErrorText = document.querySelector(".category-error");
const dateErrorText = document.querySelector(".date-error");
const description = document.getElementById("task-input");
const category = document.querySelector(".select-label");
const date = document.getElementById("date");
let isValid = true;
let categoryValue;
let tasks = JSON.parse(localStorage.getItem("taskList")) || [];

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

addTask.addEventListener("click", () => {
  const descriptionValue = description.value;
  const dateValue = date.value;
  isValid = true;

  console.log(`Task Description: ${descriptionValue}`);
  console.log(`Date Value: ${dateValue}`);
  console.log(`Category Value: ${categoryValue}`);

  formValidator(dateValue, descriptionValue);

  if (isValid === false) return;

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
    retrieveTasks();
    renderTasks();
});

// Handle selecting an option
dropdown.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    selectLabel.querySelector("p").textContent = item.textContent;
    selectLabel.classList.remove("active");
    dropdown.classList.remove("show");
  });
});

//Add new Task
function addUserTask(descriptionInput, categoryInput, dateInput) {
  const myTask = new Task(descriptionInput, categoryInput, dateInput);
  tasks.push(myTask);
  storeTasks();
  renderTasks();
  modalContainer.classList.remove("active-modal");
}

//Form Validation
function formValidator(dateInput, descriptionInput) {
  if (descriptionInput.trim() === "") {
    descriptionErrorText.classList.remove("hidden");
    description.classList.add("error");
    isValid = false;
  } else {
    descriptionErrorText.classList.add("hidden");
    description.classList.remove("error");
  }

  if (dateInput.trim() === "") {
    dateErrorText.classList.remove("hidden");
    date.classList.add("error");
    isValid = false;
  } else {
    dateErrorText.classList.add("hidden");
    date.classList.remove("error");
  }

  if (categoryValue === undefined || categoryValue === "") {
    categoryErrorText.classList.remove("hidden");
    category.classList.add("error");
    isValid = false;
  } else {
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

function storeTasks() {
  localStorage.setItem("taskList", JSON.stringify(tasks));
  console.log(localStorage);
}

function retrieveTasks() {
  tasks = JSON.parse(localStorage.getItem("taskList")) || [];
  console.log(tasks);
}

function renderTasks() {
  pendingTaskContainer.innerHTML = "";

  tasks.forEach((task) => {
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


  if (tasks.length == 0){
    filledState.classList.add("hidden");
    emptyState.classList.remove("hidden");
  }
  else{
    filledState.classList.remove("hidden");
    emptyState.classList.add("hidden");
  }
  
}

