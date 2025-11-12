const addBtn = document.getElementById("add-btn");

const addTaskContainer = document.getElementById("add-task-container");
const taskSubmit = document.getElementById("task-submit");
const taskTitle = document.getElementById("task-title");
const taskContainer = document.getElementById("task-container");

let taskList = [];

let currentTask = {};

let taskChecked = false;

function addTask() {
  const taskObj = {
    id: `${Date.now()}`,
    title: `${taskTitle.value}`,
    checked: false,
  };

  taskList.unshift(taskObj);

  getNewTaskList();
}

function updateTask() {
  const taskListIndex = taskList.findIndex(
    (item) => item.id === currentTask.id
  );

  const taskObj = {
    id: `${currentTask.id}`,
    title: `${taskTitle.value}`,
    checked: currentTask.checked,
  };

  taskList[taskListIndex] = taskObj;

  getNewTaskList();
}

function toggler() {
  addBtn.classList.toggle("hide");
  addTaskContainer.classList.toggle("hide");
}

addBtn.addEventListener("click", () => {
  toggler();

  taskTitle.value = "";
  taskSubmit.innerText = "Submit";
});

taskSubmit.addEventListener("click", () => {
  if (!taskTitle.value) {
    alert("Task title cannot be empty.");
    return;
  }

  if (taskSubmit.innerText === "Submit") {
    addTask();
  } else {
    updateTask();
  }

  toggler();
});

function getNewTaskList() {
  taskContainer.replaceChildren();

  taskList.forEach((el) => {
    const listContainer = document.createElement("div");
    listContainer.id = `${el.id}`;
    listContainer.classList.add("single-task");

    const singleTaskContainer = document.createElement("div");
    singleTaskContainer.classList.add("task-check");

    const title = document.createElement("p");
    title.classList.add("show-task");
    title.textContent = el.title;
    title.style.color = el.checked ? "#B2B0E899" : "inherit";
    title.style.textDecoration = el.checked ? "line-through #B2B0E8" : "none";

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.classList.add("check-task");
    checkboxInput.checked = el.checked;

    checkboxInput.addEventListener("change", () => checkedTask(`${el.id}`));

    singleTaskContainer.append(checkboxInput, title);

    const buttonContainer = document.createElement("div");

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.type = "button";
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => editTask(`${el.id}`));

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => deleteTask(`${el.id}`));

    buttonContainer.append(editButton, deleteButton);

    listContainer.append(singleTaskContainer, buttonContainer);

    taskContainer.appendChild(listContainer);
  });
}

function deleteTask(id) {
  const isConfirmed = confirm("Are you sure to delete this task?");

  if (!isConfirmed) return;

  const taskListIndex = taskList.findIndex((item) => item.id === id);

  taskList.splice(taskListIndex, 1);
  // getTaskList();
  getNewTaskList();
}

function editTask(id) {
  const taskListIndex = taskList.findIndex((item) => item.id === id);

  currentTask = taskList[taskListIndex];

  taskTitle.value = currentTask.title;

  taskSubmit.innerText = "Update Task";

  toggler();
}

function checkedTask(id) {
  taskList = taskList.map((item) => {
    return {
      id: item.id,
      title: item.title,
      checked: item.id === id ? !item.checked : item.checked,
    };
  });

  getNewTaskList();
}
