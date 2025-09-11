const selectLabel = document.querySelector(".select-label");
const dropdown = document.querySelector("#categories");
const closeButton = document.querySelector(".close-btn");
const modalContainer = document.querySelector(".modal-container");
const addNewTask = document.querySelector(".add-task-btn");
const categories = document.getElementById("categories");
const addTask = document.getElementById("add-modal-btn");
const pendingTaskContainer = document.querySelector(".pending-task-wrapper");
const filledState = document.querySelector(".filled-state");
let categoryValue;
let tasks = [];

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
  const description = document.getElementById("task-input");
  const category = document.querySelector(".select-label");
  const date = document.getElementById("date");
  const descriptionValue = description.value;
  const dateValue = date.value;
  const descriptionErrorText = document.querySelector(".description-error");
  const categoryErrorText = document.querySelector(".category-error");
  const dateErrorText = document.querySelector(".date-error");

  console.log(`Task Description: ${descriptionValue}`);
  console.log(`Date Value: ${dateValue}`);
  console.log(`Category Value: ${categoryValue}`);

  if (descriptionValue.trim() === "") {
    descriptionErrorText.classList.remove("hidden");
    description.classList.add("error");
  } else {
    descriptionErrorText.classList.add("hidden");
    description.classList.remove("error");
  }

  if (dateValue.trim() === "") {
    dateErrorText.classList.remove("hidden");
    date.classList.add("error");
  } else {
    dateErrorText.classList.add("hidden");
    date.classList.remove("error");
  }

  if (categoryValue === undefined) {
    categoryErrorText.classList.remove("hidden");
    category.classList.add("error");
  } else {
    categoryErrorText.classList.add("hidden");
    category.classList.remove("error");
  }

  addUserTask(descriptionValue, categoryValue, dateValue);

  filledState.classList.remove("hidden");

  modalContainer.classList.toggle("active-modal");
});

addNewTask.addEventListener("click", () => {
  modalContainer.classList.toggle("active-modal");
});

closeButton.addEventListener("click", () => {
  modalContainer.classList.toggle("active-modal");
});

modalContainer.addEventListener("click", (event) => {
  if (event.target === modalContainer) {
    modalContainer.classList.toggle("active-modal");
  }
});

selectLabel.addEventListener("click", () => {
  selectLabel.classList.toggle("active");
  dropdown.classList.toggle("show");
});

// Handle selecting an option
dropdown.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    selectLabel.querySelector("p").textContent = item.textContent;
    selectLabel.classList.remove("active");
    dropdown.classList.remove("show");
  });
});

function addUserTask(descriptionInput, categoryInput, dateInput) {
  const myTask = new Task(descriptionInput, categoryInput, dateInput);
  tasks.push(myTask);

  console.log(tasks);

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

    pendingTaskContainer.innerHTML = taskRow;
  });
}
