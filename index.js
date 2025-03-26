const input = document.querySelector('input');
const addTaskButton = document.querySelector('add-task');
const tasksParent = document.createElement('ol');
tasksParent.classList.add('tasks-parent');
const tasksList = [];
let idCounter;
let newTask;
let removeTaskButton;

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
  const task = { value: input.value, id: idCounter };
  tasksList.push(task);
  console.log('idCounter', idCounter);

  setTaskToLocalStorage();

  newTask = document.createElement('li');
  newTask.setAttribute('id', task.id);
  tasksParent.appendChild(newTask);
  newTask.innerHTML = task.value;
  console.log('task.id', task.id);

  const removeTaskButton = document.createElement('button');
  removeTaskButton.innerHTML = 'Remove task';
  removeTaskButton.addEventListener('click', () => removeTask(task.id));
  newTask.appendChild(removeTaskButton);

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

const removeTask = (id) => {
  const taskId = tasksList.findIndex((task) => task.id === id);
  tasksList.splice(taskId, 1);

  document.getElementById(id)?.remove();
  console.log(id, 'id');
  console.log('tasksParent', tasksParent);

  localStorage.setItem('tasksList', JSON.stringify(tasksList));
};

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
      taskItem.setAttribute('id', task.id);
      taskItem.innerHTML = task.value;
      console.log(task.id);

      const removeTaskButton = document.createElement('button');
      removeTaskButton.innerHTML = 'Remove task';
      removeTaskButton.addEventListener('click', () => removeTask(task.id));

      taskItem.appendChild(removeTaskButton);
      tasksParent.appendChild(taskItem);
    });
  }
};

document.body.appendChild(tasksParent);

getTaskFromLocalStorage();
