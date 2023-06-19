// Selecting DOM elements
const taskForm = document.getElementById("task-form");
const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

// Add task event listener
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = inputField.value.trim();

  if (taskText !== "") {
    // Create task element
    const task = document.createElement("li");
    task.classList.add("task");

    // Create task text element
    const taskTextElement = document.createElement("span");
    taskTextElement.classList.add("task-text");
    taskTextElement.textContent = taskText;

    // Create delete button element
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";

    // Append task text and delete button to task element
    task.appendChild(taskTextElement);
    task.appendChild(deleteButton);

    // Append task to task list
    taskList.appendChild(task);

    // Save tasks to local storage
    saveTasksToLocalStorage();

    // Clear input field
    inputField.value = "";
  }
});

// Delete task event listener
taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    const task = event.target.closest(".task");
    task.remove();

    // Save tasks to local storage
    saveTasksToLocalStorage();
  }
});

// Save tasks to local storage
function saveTasksToLocalStorage() {
  const tasks = Array.from(taskList.children).map(function (task) {
    return task.querySelector(".task-text").textContent;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (savedTasks) {
    savedTasks.forEach(function (taskText) {
      const task = document.createElement("li");
      task.classList.add("task");

      const taskTextElement = document.createElement("span");
      taskTextElement.classList.add("task-text");
      taskTextElement.textContent = taskText;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.textContent = "Delete";

      task.appendChild(taskTextElement);
      task.appendChild(deleteButton);

      taskList.appendChild(task);
    });
  }
}

// Load tasks from local storage on page load
loadTasksFromLocalStorage();
