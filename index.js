const input = document.querySelector('input');
const addTaskButton = document.querySelector('ad-task');
const tasksParent = document.createElement('ul');
tasksParent.classList.add('tasks-parent');

const updateValue = (event) => {
    input.value = event.target.value
}
input.addEventListener( 'change', (event) => updateValue(event));

const addTask = () => {
    const newTask = document.createElement("li");
    tasksParent.appendChild(newTask);
    console.log(tasksParent);
    newTask.innerHTML = input.value;   
    cleanInput();
}

const cleanInput = () => {
    input.value = ""; 
}

document.body.appendChild(tasksParent);