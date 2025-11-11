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

// function getTaskList() {
//   taskContainer.innerHTML = "";
//   taskList.forEach((el) => {
//     taskContainer.innerHTML += `
//         <div id="${el.id}">
//             <div class="task-check">
//             <p id="show-task" style="color: ${
//               el.checked ? "red" : "inherit"
//             };">${el.title}</p>
//             <input type="checkbox" id="check-task" onchange="checkedTask(${
//               el.id
//             })" ${el.checked ? "checked" : ""}>
//             </div>
//             <button type="button" id="edit-btn" onclick="editTask('${
//               el.id
//             }')">Edit</button>
//             <button type="button" id="delete-btn" onclick="deleteTask('${
//               el.id
//             }')">Delete</button>
//         </div>
//         `;
//   });
// }

// trying to work with create element

function getNewTaskList() {
  
    taskContainer.replaceChildren();

  taskList.forEach((el) => {
    const listContainer = document.createElement("div");
    listContainer.id = `${el.id}`;

    const singleTaskContainer = document.createElement('div');
    singleTaskContainer.classList.add('task-check');

    const title = document.createElement('p');
    title.classList.add("show-task");
    title.textContent = el.title;
    title.style.color = el.checked ? 'red' : 'inherit';

    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.classList.add('check-task');
    checkboxInput.checked = el.checked;

    checkboxInput.addEventListener("change" , () => checkedTask(`${el.id}`));

    singleTaskContainer.append(title , checkboxInput);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.type = "button";
    editButton.textContent = 'Edit';

    editButton.addEventListener("click" , () => editTask(`${el.id}`));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.type = "button";
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener("click" , () => deleteTask(`${el.id}`));

    listContainer.append(singleTaskContainer , editButton , deleteButton);

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
