const input = document.querySelector('input');
const addTaskButton = document.querySelector('add-task');
const tasksParent = document.createElement('ul');
tasksParent.classList.add('tasks-parent');
const tasksList = [];
let idCounter = 0;
let newTask;
let removeTaskButton;

const updateValue = (event) => {
  input.value = event.target.value;
};
input.addEventListener('change', (event) => updateValue(event));
input.addEventListener('keypress', (event) => handleEnterKey(event));

const addTask = () => {
  if (input.value.trim() === '') return;
  newTask = document.createElement('li');
  newTask.setAttribute('id', idCounter++);
  console.log(newTask);

  tasksParent.appendChild(newTask);
  newTask.innerHTML = input.value;
  // tasksList.push({value: input.value, id: idCounter++})
  console.log(tasksList);
  
  addTasktoList();
  addRemoveTaskButton();
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

const addRemoveTaskButton = () => {
  const removeTaskButton = document.createElement('button');
  removeTaskButton.innerHTML = 'Remove task';
  removeTaskButton.addEventListener('click', () => removeTask());
  console.log('test');
  
  newTask.appendChild(removeTaskButton);
};

const removeTask = () => {
  console.log('tasksList', tasksList)
};

const addTasktoList = () => {
  tasksList.push({ value: input.value, id: newTask.id });
  console.log(tasksList);
  return tasksList;
};

document.body.appendChild(tasksParent);
