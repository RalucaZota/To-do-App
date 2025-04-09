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
  newRow = document.createElement('tr'); 
  newCell = document.createElement('td'); 
  newCell2 = document.createElement('td'); 
  newCell3 = document.createElement('td'); 
  newCell.setAttribute('id', task.id);
  newCell.setAttribute('draggable', true);
  console.log('newRow', newRow);
  console.log('newCell', newCell);

  const checkboxInput = document.createElement('input');
  checkboxInput.setAttribute('type', 'checkbox');
  checkboxInput.checked = task.checked;

  newCell.appendChild(checkboxInput);
  newCell.appendChild(document.createTextNode(task.value));
  newRow.append(newCell, newCell2, newCell3);
  
  tableBody.append(newRow);

  checkboxInput.addEventListener('change', () => {
    changeCheckBoxValue(task.id, checkboxInput);
  });

  newCell.addEventListener('dragstart', (event) => {
    dragstartHandler(event, task.id);
  });
  newCell2.addEventListener('dragover', (event) => {
    dragoverHandler(event);
  });
  console.log(newCell2, 'newcell2');
  
  newCell2.addEventListener('drop', (event) => {
    dropHandler(event);
  });
  // newCell3.addEventListener('dragstart', (event) => {
  //   dragstartHandler(event, task.id);
  // });
};

const setTaskToLocalStorage = () => {
  localStorage.setItem('tasksList', JSON.stringify(tasksList));
};

const getTaskFromLocalStorage = () => {
  tasksList.forEach((task) => createTask(task));
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
      const cell = document.getElementById(task.id);
      const row = cell?.closest('tr');
      row?.remove();
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

const dragstartHandler = (ev, id) => {
  console.log(ev, 'ev');
  console.log(id, 'id');
  ev.dataTransfer.setData("text", id);
}

const dragoverHandler = (ev) => {
  ev.preventDefault();
  console.log('dragoverHandler');
}

const dropHandler = (ev) => {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  console.log('data', data);
  console.log('ev dropHandler', ev);
  
  
  newCell2.appendChild(document.getElementById(data));
  console.log(ev.target, 'ev.target');
  
  console.log('dropHandler');
}

window.addTask = addTask;
// window.addTaskToTable = addTaskToTable;
window.removeTask = removeTask;
// window.createRow = createRow;