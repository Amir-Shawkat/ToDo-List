const addBtn = document.getElementById("add-btn");

const addTaskContainer = document.getElementById("add-task-container");
const taskSubmit = document.getElementById("task-submit");
const taskTitle = document.getElementById("task-title");
const taskContainer = document.getElementById("task-container");
const cancelSubmit = document.getElementById("cancel-submit");

const clearList = document.getElementById("clear-btn");

const editBtn = document.querySelectorAll(".edit-btn")

const notFound = document.getElementById("not-found-message");
const searchTask = document.getElementById("search-task");

let taskList = JSON.parse(localStorage.getItem("todoList")) || [];

let currentTask = {};

getNewTaskList();

searchTask.addEventListener("input" , () => {
  const searchTerm = searchTask.value.toLowerCase();
  if (searchTerm) {
  
    const filteredTasks = taskList.filter(task => task.title.toLowerCase().includes(searchTerm));

    getSearchTasks(filteredTasks);
  } else {
    getNewTaskList();
  }
});


console.log(taskList)
function addTask() {
  const taskObj = {
    id: `${Date.now()}`,
    title: `${taskTitle.value}`,
    checked: false,
  };

  taskList.unshift(taskObj);

  localStorage.setItem("todoList", JSON.stringify(taskList));

  getNewTaskList();
}

function updateTask(str) {
  if (!str) {
    alert("Task title cannot be empty.");
    return;
  }

  const taskListIndex = taskList.findIndex(
    (item) => item.id === currentTask.id
  );

  const taskObj = {
    id: `${currentTask.id}`,
    title: str,
    checked: currentTask.checked,
  };

  taskList[taskListIndex] = taskObj;

  localStorage.setItem("todoList", JSON.stringify(taskList));

  getNewTaskList();
}

function toggler() {
  addBtn.classList.toggle("hide");
  addTaskContainer.classList.toggle("hide");
}

addBtn.addEventListener("click", () => {
  toggler();

  taskTitle.value = "";
});

taskSubmit.addEventListener("click", () => {
  if (!taskTitle.value) {
    alert("Task title cannot be empty.");
    return;
  }

  addTask();

  toggler();
});

cancelSubmit.addEventListener("click", () => {
  toggler();
});

function getNewTaskList() {
  taskList.length === 0
    ? (clearList.style.display = "none")
    : (clearList.style.display = "block");

  taskContainer.replaceChildren();

  searchTask.textContent = ""

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
    buttonContainer.classList.add("button-container");

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.type = "button";
    editButton.textContent = "Edit";
    el.checked === true ? editButton.style.display = "none" : editButton.style.display = "block";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => deleteTask(`${el.id}`));

    const updateContainer = document.createElement("div");
    updateContainer.classList.add("update-container");
    updateContainer.style.display = "none";

    const updateInput = document.createElement("input");
    updateInput.classList.add("update-title");

    const updateButtonContainer = document.createElement("div");

    const updateButton = document.createElement("button");
    updateButton.type = "button";
    updateButton.textContent = "Update";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    const updownContainer = document.createElement("div");
    updownContainer.classList.add("updown-container");

    const upBtn = document.createElement("button");
    upBtn.type = "button";
    upBtn.textContent = "⇑";
    upBtn.classList.add("up-btn");

    const downBtn = document.createElement("button");
    downBtn.type = "button";
    downBtn.textContent = "⇓";
    downBtn.classList.add("down-btn");

    updownContainer.append(upBtn, downBtn);

    updateButtonContainer.append(updateButton, cancelButton);

    updateContainer.append(updateInput, updateButtonContainer);

    buttonContainer.append(updownContainer, editButton, deleteButton);

    listContainer.append(singleTaskContainer, buttonContainer);

    taskContainer.append(listContainer, updateContainer);

    editButton.addEventListener("click", () => {
      updateContainer.style.display = "flex";
      listContainer.style.display = "none";
      updateInput.value = `${el.title}`;
      editTask(`${el.id}`);
    });

    cancelButton.addEventListener("click", () => {
      updateInput.value = "";
      currentTask = {};
      updateContainer.style.display = "none";
      listContainer.style.display = "flex";
    });

    updateButton.addEventListener("click", () => {
      updateTask(updateInput.value);
      updateContainer.style.display = "none";
      listContainer.style.display = "flex";
    });

    upBtn.addEventListener("click", () => {
      moveTask(`${el.id}`, "up");
      getNewTaskList();
    });

    downBtn.addEventListener("click", () => {
      moveTask(`${el.id}`, "down");
      getNewTaskList();
    });
    
    // if (el.checked) {
    //   console.log(taskList)
    //   editBtn.style.display = "none";
    // } else {
    //   editBtn.style.display = "block";
    // }
  });
}

function getSearchTasks(filter){
  if(searchTask !== ""){
    taskContainer.replaceChildren();
    if(filter.length === 0){
      notFound.style.display = "block";
      getNewTaskList();
    } else {
      notFound.style.display = "none";
      // filter.forEach(task => {
      //   const searchedTaskElement = document.createElement("div");
      //   searchedTaskElement.classList.add("searched-task-element");

      //   searchedTaskElement.textContent = task.title;

      //   taskContainer.append(searchedTaskElement);
      // });
      filter.forEach((el) => {
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

      

      singleTaskContainer.append(checkboxInput, title);

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");

      const editButton = document.createElement("button");
      editButton.classList.add("edit-btn");
      editButton.type = "button";
      editButton.textContent = "Edit";
      el.checked === true ? editButton.style.display = "none" : editButton.style.display = "block";

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-btn");
      deleteButton.type = "button";
      deleteButton.textContent = "Delete";

      const updateContainer = document.createElement("div");
      updateContainer.classList.add("update-container");
      updateContainer.style.display = "none";

      const updateInput = document.createElement("input");
      updateInput.classList.add("update-title");

      const updateButtonContainer = document.createElement("div");

      const updateButton = document.createElement("button");
      updateButton.type = "button";
      updateButton.textContent = "Update";

      const cancelButton = document.createElement("button");
      cancelButton.type = "button";
      cancelButton.textContent = "Cancel";

      // const updownContainer = document.createElement("div");
      // updownContainer.classList.add("updown-container");

      // const upBtn = document.createElement("button");
      // upBtn.type = "button";
      // upBtn.textContent = "⇑";
      // upBtn.classList.add("up-btn");

      // const downBtn = document.createElement("button");
      // downBtn.type = "button";
      // downBtn.textContent = "⇓";
      // downBtn.classList.add("down-btn");

      // updownContainer.append(upBtn, downBtn);

      updateButtonContainer.append(updateButton, cancelButton);

      updateContainer.append(updateInput, updateButtonContainer);

      buttonContainer.append(editButton, deleteButton);

      listContainer.append(singleTaskContainer, buttonContainer);

      taskContainer.append(listContainer, updateContainer);

      checkboxInput.addEventListener("change", () => checkedTask(`${el.id}`));

      editButton.addEventListener("click", () => {
        updateContainer.style.display = "flex";
        listContainer.style.display = "none";
        updateInput.value = `${el.title}`;
        editTask(`${el.id}`);
      });

      deleteButton.addEventListener("click", () => deleteTask(`${el.id}`));

      cancelButton.addEventListener("click", () => {
        updateInput.value = "";
        currentTask = {};
        updateContainer.style.display = "none";
        listContainer.style.display = "flex";
      });

      updateButton.addEventListener("click", () => {
        updateTask(updateInput.value);
        updateContainer.style.display = "none";
        listContainer.style.display = "flex";
      });

      // upBtn.addEventListener("click", () => {
      //   moveTask(`${el.id}`, "up");
      //   getNewTaskList();
      // });

      // downBtn.addEventListener("click", () => {
      //   moveTask(`${el.id}`, "down");
      //   getNewTaskList();
      // });
      
    });
    }
  }
}

clearList.addEventListener("click", () => {
  const isConfirmed = confirm("Are you sure to clear the ToDo list?");

  if (!isConfirmed) return;

  localStorage.removeItem("todoList");

  taskList = [];

  getNewTaskList();
});

function deleteTask(id) {
  const isConfirmed = confirm("Are you sure to delete this task?");

  if (!isConfirmed) return;

  const taskListIndex = taskList.findIndex((item) => item.id === id);

  taskList.splice(taskListIndex, 1);

  localStorage.setItem("todoList", JSON.stringify(taskList));

  // getTaskList();
  getNewTaskList();
}

function editTask(id) {
  const taskListIndex = taskList.findIndex((item) => item.id === id);

  currentTask = taskList[taskListIndex];
}

function checkedTask(id) {
  taskList = taskList.map((item) => {
    return {
      id: item.id,
      title: item.title,
      checked: item.id === id ? !item.checked : item.checked,
    };
  });
  localStorage.setItem("todoList", JSON.stringify(taskList));
  getNewTaskList();
}

function moveTask(id, direction) {
  const currentIndex = taskList.findIndex((item) => item.id === id);

  const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (newIndex >= 0 && newIndex < taskList.length) {
    const newTaskList = [...taskList];

    const [movedTask] = newTaskList.splice(currentIndex, 1);

    newTaskList.splice(newIndex, 0, movedTask);

    taskList = newTaskList;

    return taskList;
  }

  return taskList;
}
