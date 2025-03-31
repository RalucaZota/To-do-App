const input = document.querySelector('input');
const addTaskButton = document.querySelector('.add-task');
const tasksParent = document.querySelector('.tasks-parent');
const tasksList = JSON.parse(localStorage.getItem('tasksList')) || [];
let idCounter = localStorage.getItem('idCounter') ? parseInt(localStorage.getItem('idCounter')) : 0;
let task;
let newTask;
let isChecked = false;
let removeButton;

const updateValue = (event) => {
  input.value = event.target.value;
};
input.addEventListener('change', (event) => updateValue(event));
input.addEventListener('keypress', (event) => handleEnterKey(event));

console.log(tasksList, "tasksList");
const addTask = () => {
  if (input.value.trim() === "") return;
  idCounter++;
  localStorage.setItem("idCounter", JSON.stringify(idCounter));

  task = { value: input.value, id: idCounter, checked: isChecked };
  tasksList.push(task);
  console.log("task", task);
  console.log(tasksList, "tasksList");
  // tasksList.filter((task) => {
  //   console.log(task, "task");

  //   if (!task.checked) {
  //     document.querySelector(".remove-task").disabled = true;
  //   } else {
  //     document.querySelector(".remove-task").disabled = false;
  //   }
  // });

  setTaskToLocalStorage();
  createTask(task);
  cleanInput();
};

const cleanInput = () => {
  input.value = '';
};

const handleEnterKey = (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
};

const createTask = (task) => {
  newTask = document.createElement('li');
  newTask.classList.add('task')
  newTask.setAttribute('id', task.id);

  const checkboxInput = document.createElement('input');
  checkboxInput.setAttribute('type', 'checkbox');
  checkboxInput.checked = task.checked;

  newTask.appendChild(checkboxInput);
  newTask.appendChild(document.createTextNode(task.value));
  tasksParent.appendChild(newTask);
  console.log(task.id);
  console.log(checkboxInput, 'checkboxInput');

  checkboxInput.addEventListener('change', () => {
    changeCheckBoxValue(task.id, checkboxInput);
  });
};

const setTaskToLocalStorage = () => {
  localStorage.setItem('tasksList', JSON.stringify(tasksList));
};

const getTaskFromLocalStorage = () => {
  tasksList.forEach((task) => createTask(task));
  console.log(tasksList, "getTaskFromLocalStorage");
  tasksList.filter((task) => {
    console.log(task, "task");
    if (!task.checked) {
      document.querySelector(".remove-task").disabled = true;
    } else {
      document.querySelector(".remove-task").disabled = false;
    }
  });
};

const changeCheckBoxValue = (taskId, checkbox) => {
  console.log(tasksList);
  console.log("task.id", taskId);
  console.log("checkbox", checkbox);

  const taskIndex = tasksList.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasksList[taskIndex].checked = checkbox.checked;
    setTaskToLocalStorage();
    if (tasksList[taskIndex].checked) {
      console.log(tasksList[taskIndex].checked);
      document.querySelector(".remove-task").disabled = false;
    } else {
      document.querySelector(".remove-task").disabled = true;
    }
  }
};

const removeTask = () => {
  tasksList.forEach((task) => {
    if (task.checked) {
      document.getElementById(task.id)?.remove();
    }
  });
  const updatedTasksList = tasksList.filter((task) => !task.checked);
  localStorage.setItem("tasksList", JSON.stringify(updatedTasksList));
  document.querySelector(".remove-task").disabled = true;
};

getTaskFromLocalStorage();
