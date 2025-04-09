// import { addTaskToTable, createRow } from './table.js';

const input = document.querySelector('input');
const addTaskButton = document.querySelector('.add-task');
const tasksParent = document.querySelector('.tasks-parent');
export const tasksList = JSON.parse(localStorage.getItem('tasksList')) || [];
let idCounter = localStorage.getItem('idCounter') ? parseInt(localStorage.getItem('idCounter')) : 0;
let task;
let newTask;
let isChecked = false;
let removeButton;
const tableBody = document.querySelector('tbody');
let newRow;
let newCell;
let newCell2;
let newCell3;
let taskItem;
let taskItems = [];

const updateValue = (event) => {
  input.value = event.target.value;
};
input.addEventListener('change', (event) => updateValue(event));
input.addEventListener('keypress', (event) => handleEnterKey(event));

const addTask = () => {
  if (input.value.trim() === '') return;
  idCounter++;
  localStorage.setItem('idCounter', JSON.stringify(idCounter));

  task = { value: input.value, id: idCounter, checked: isChecked };
  tasksList.push(task);
console.log('tasksList', tasksList);

  setTaskToLocalStorage();
  createTask(task);
  cleanInput();
  // createRow();
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
  // console.log('table', table);
  
  newRow = document.createElement('tr'); 
  newCell = document.createElement('td'); 
  newCell2 = document.createElement('td'); 
  newCell3 = document.createElement('td'); 
  newCell.setAttribute('id', task.id);
  console.log('newRow', newRow);
  console.log('newCell', newCell);
  

  const checkboxInput = document.createElement('input');
  checkboxInput.setAttribute('type', 'checkbox');
  checkboxInput.checked = task.checked;

  newCell.appendChild(checkboxInput);
  newCell.appendChild(document.createTextNode(task.value));
  newRow.append(newCell, newCell2, newCell3);
  console.log(tableBody);
  
  tableBody.append(newRow);

  // checkboxInput.addEventListener('change', () => {
  //   changeCheckBoxValue(task.id, checkboxInput);
  // });
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
      console.log('removeTask', task);
      
      document.getElementById(task.id)?.remove();
      console.log('newRow removeTask', newRow);
      // const removedTask = tableBody.find((el) => console.log('el', el)
      
    }
  });
  const updatedTasksList = tasksList.filter((task) => !task.checked);
  localStorage.setItem('tasksList', JSON.stringify(updatedTasksList));
  document.querySelector('.remove-task').disabled = true;
};

const unableRemoveButton = (list) => {
  console.log(list, 'unableRemoveButton');
  
  const removeButton = document.querySelector('.remove-task');

  const hasCheckedTask = list?.some(task => task.checked);
  removeButton.disabled = !hasCheckedTask;
  
  console.log(hasCheckedTask ? 'exista checked tasks' : 'nu este niciun checked');
};

unableRemoveButton(tasksList);

getTaskFromLocalStorage();

window.addTask = addTask;
// window.addTaskToTable = addTaskToTable;
window.removeTask = removeTask;
// window.createRow = createRow;