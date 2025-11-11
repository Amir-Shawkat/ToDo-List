const addBtn = document.getElementById("add-btn");
const editBtn = document.getElementById("edit-btn");
const deleteBtn = document.getElementById("delete-btn");

const addTaskContainer = document.getElementById("add-task-container");
const taskSubmit = document.getElementById("task-submit");
const taskTitle = document.getElementById("task-title");
const taskContainer = document.getElementById("task-container");

const showTask = document.getElementById("show-task");

let checkTask = document.getElementById("check-task");

let taskList = [];

let currentTask = {};

let taskChecked = false;

function addTask() {
  if (!taskTitle.value) {
    alert("Task title cannot be empty.");
    return;
  }

  const taskObj = {
    id: `${Date.now()}`,
    title: `${taskTitle.value}`,
    checked: false,
  };

  taskList.unshift(taskObj);

  getTaskList();
}

function updateTask() {
  if (!taskTitle.value) {
    alert("Task title cannot be empty.");
    return;
  }

  const taskListIndex = taskList.findIndex(
    (item) => item.id === currentTask.id
  );

  const taskObj = {
    id: `${currentTask.id}`,
    title: `${taskTitle.value}`,
    checked: currentTask.checked,
  };

  taskList[taskListIndex] = taskObj;

  getTaskList();
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
  toggler();

  if (taskSubmit.innerText === "Submit") {
    addTask();
  }

  updateTask();
});

function getTaskList() {
  taskContainer.innerHTML = "";
  taskList.forEach((el) => {
    taskContainer.innerHTML += `
        <div id="${el.id}">
            <div class="task-check">
            <p id="show-task" style="color: ${
              el.checked ? "red" : "inherit"
            };">${el.title}</p>
            <input type="checkbox" id="check-task" onchange="checkedTask(${
              el.id
            })" ${el.checked ? "checked" : ""}>
            </div>
            <button type="button" id="edit-btn" onclick="editTask('${
              el.id
            }')">Edit</button>
            <button type="button" id="delete-btn" onclick="deleteTask('${
              el.id
            }')">Delete</button>
        </div>
        `;
  });
}

function deleteTask(id) {
  let isConfirmed = confirm("Are you sure to delete this task?");

  if (isConfirmed) {
    const taskListIndex = taskList.findIndex((item) => item.id === id);

    console.log(taskList);
    console.log(taskListIndex);
    console.log(id);

    taskList.splice(taskListIndex, 1);
    getTaskList();
  }

  getTaskList();
}

function editTask(id) {
  const taskListIndex = taskList.findIndex((item) => item.id === id);

  currentTask = taskList[taskListIndex];

  taskTitle.value = currentTask.title;

  toggler();

  taskSubmit.innerText = "Update Task";
}

function checkedTask(id) {
  taskList = taskList.map((item) => {
    console.log(item.id == id ? !item.checked : item.checked);
    return {
      id: item.id,
      title: item.title,
      checked: item.id == id ? !item.checked : item.checked,
    };
  });
  console.log(taskList);
  getTaskList();
}
