const input = document.querySelector('input');
const addTaskButton = document.querySelector('.add-task');
const tasksParent = document.querySelector('.tasks-parent');
const tasksList = [];
let idCounter;
let task;
let newTask;
let checkboxInput;
let removeTaskButton;
let isChecked = false;

const updateValue = (event) => {
  input.value = event.target.value;
};
input.addEventListener('change', (event) => updateValue(event));
input.addEventListener('keypress', (event) => handleEnterKey(event));

const addTask = () => {
  if (input.value.trim() === '') return;
  idCounter = localStorage.getItem('idCounter') ? parseInt(localStorage.getItem('idCounter')) : 0;
  idCounter++
  localStorage.setItem('idCounter', JSON.stringify(idCounter));
  task = { value: input.value, id: idCounter, checked: isChecked };
  tasksList.push(task);
  console.log('task.value', task.value);

  setTaskToLocalStorage();
  createTask();
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

const createTask = () => {
  newTask = document.createElement('li');
  checkboxInput = document.createElement('input');
  newTask.classList.add('task')
  newTask.setAttribute('id', task.id);
  checkboxInput.setAttribute('type', 'checkbox');
  newTask.appendChild(checkboxInput);
  newTask.appendChild(document.createTextNode(task.value));
  tasksParent.appendChild(newTask);
}

const setTaskToLocalStorage = () => {
  localStorage.setItem('tasksList', JSON.stringify(tasksList));
};

const getTaskFromLocalStorage = () => {
  const storedTasks = localStorage.getItem('tasksList');
  console.log(storedTasks);
  if (storedTasks) {
    tasksList.push(...JSON.parse(storedTasks));
    tasksList.forEach((task) => {
      const taskItem = document.createElement('li');
      const checkbox = document.createElement('input');
      taskItem.classList.add('task')
      taskItem.setAttribute('id', task.id);
      checkbox.setAttribute('type', 'checkbox');
      console.log(task.id);
      taskItem.appendChild(checkbox);
      // taskItem.innerHTML = task.value;
      taskItem.appendChild(document.createTextNode(task.value));
      tasksParent.appendChild(taskItem);
    });
  }
};

getTaskFromLocalStorage();
