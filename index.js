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

console.log(tasksList, 'tasksList');
const addTask = () => {
  if (input.value.trim() === '') return;
  idCounter++;
  localStorage.setItem('idCounter', JSON.stringify(idCounter));

  task = { value: input.value, id: idCounter, checked: isChecked };
  tasksList.push(task);

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
  newTask.classList.add('task');
  newTask.setAttribute('id', task.id);

  const checkboxInput = document.createElement('input');
  checkboxInput.setAttribute('type', 'checkbox');
  checkboxInput.checked = task.checked;

  newTask.appendChild(checkboxInput);
  newTask.appendChild(document.createTextNode(task.value));
  tasksParent.appendChild(newTask);

  checkboxInput.addEventListener('change', () => {
    changeCheckBoxValue(task.id, checkboxInput);
  });
};

const setTaskToLocalStorage = () => {
  localStorage.setItem('tasksList', JSON.stringify(tasksList));
};

const getTaskFromLocalStorage = () => {
  tasksList.forEach((task) => createTask(task));
  console.log(tasksList, 'getTaskFromLocalStorage');
};

const changeCheckBoxValue = (taskId, checkbox) => {
  const taskIndex = tasksList.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasksList[taskIndex].checked = checkbox.checked;
    setTaskToLocalStorage();
    console.log(tasksList, 'changeCheckBoxValue');
    unableRemoveButton(tasksList);
  }
};

const removeTask = () => {
  tasksList.forEach((task) => {
    if (task.checked) {
      document.getElementById(task.id)?.remove();
    }
  });
  const updatedTasksList = tasksList.filter((task) => !task.checked);
  localStorage.setItem('tasksList', JSON.stringify(updatedTasksList));
  console.log(tasksList, 'removeTask');

  document.querySelector('.remove-task').disabled = true;
};

const unableRemoveButton = (list) => {
  console.log(list, 'unableRemoveButton');

  if (!list || list.length === 0) {
    console.log(list, 'tasksList unableRemoveButton');
    document.querySelector('.remove-task').disabled = true;

  } else if (!!list && list.length !== 0) {
    const checkedTask = list.find((task) => task.checked);
    console.log('exista checked tasks');
    console.log(checkedTask, 'checkedTasks');

    if (!!list && checkedTask) {
      document.querySelector('.remove-task').disabled = false;
    } else {
      console.log('nu este niciun checked');
      document.querySelector('.remove-task').disabled = true;
    }
  }
};

unableRemoveButton(tasksList);

getTaskFromLocalStorage();
