// import { addTaskToTable, createRow } from './table.js';

const input = document.querySelector('input');
export const tasksList = JSON.parse(localStorage.getItem('tasksList')) || [];
let idCounter = localStorage.getItem('idCounter') ? parseInt(localStorage.getItem('idCounter')) : 0;
let isChecked = false;
const tableBody = document.querySelector('tbody');

const updateValue = (event) => {
  input.value = event.target.value;
};
input.addEventListener('change', (event) => updateValue(event));
input.addEventListener('keypress', (event) => handleEnterKey(event));

const addTask = () => {
  if (input.value.trim() === '') return;
  idCounter++;
  localStorage.setItem('idCounter', JSON.stringify(idCounter));

  const task = { value: input.value, id: idCounter, checked: isChecked };
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
  const newRow = document.createElement('tr'); 
  const newCell = document.createElement('td'); 
  const newCell2 = document.createElement('td'); 
  const newCell3 = document.createElement('td'); 
  console.log(newCell, newCell2, newCell3);
  
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

  [newCell, newCell2, newCell3].forEach(cell => {
    cell.addEventListener('dragover', dragoverHandler);
    cell.addEventListener('drop', dropHandler);
  });

  newCell.addEventListener('dragstart', (event) => {
    dragstartHandler(event, task.id);
  });

  newRow.append(newCell, newCell2, newCell3);
  tableBody.append(newRow);
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

function dragstartHandler(ev, id) {
  console.log(ev, 'ev');
  console.log(id, 'id');
  const draggedCell = document.getElementById(id);
  ev.dataTransfer.setData("draggedHTML", draggedCell.innerHTML);
  ev.dataTransfer.setData("taskId", id);
};

function dragoverHandler (ev) {
  ev.preventDefault();
  console.log('dragoverHandler');
}

function dropHandler (ev){
  ev.preventDefault();
  console.log('ev dropHandler', ev);
  
  const droppedHTML = ev.dataTransfer.getData("draggedHTML");
  const sourceId = ev.dataTransfer.getData("taskId");
  const sourceCell = document.getElementById(sourceId);
  
  sourceCell.innerHTML = '';
  ev.currentTarget.innerHTML = droppedHTML;

  ev.currentTarget.setAttribute('id', sourceId);
  ev.currentTarget.setAttribute('draggable', true);

  ev.currentTarget.addEventListener('dragstart', (event) => {
    dragstartHandler(event, sourceId);
  });
}

window.addTask = addTask;
// window.addTaskToTable = addTaskToTable;
window.removeTask = removeTask;
// window.createRow = createRow;