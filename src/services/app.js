import { tasks } from "./tasks.js";
import { getDate } from "./getDate.js";
import { sortAscending } from "./sortAscending.js";
import { sortDescending } from "./sortDescending.js";

const body = document.querySelector('body');
const navbar = document.querySelector('.navbar');
const toDoList = document.getElementById('currentTasks');
const completedList = document.getElementById('completedTasks');
const taskTemplate = document.getElementById('task-template');
const form = document.querySelector('form');
const descendingSortBtn = document.getElementById('descending-sort');
const ascendingSortBtn = document.getElementById('ascending-sort');
const closeButtons = document.querySelectorAll('.closeBtn');
const themeBtn = document.querySelector('.theme-button');
const modal = document.querySelector('.modal-content');
const toDoTitle = document.getElementById('toDo-title');
const completedTitle = document.getElementById('completed-title');

function changeTheme() {
  body.classList.toggle('dark');
  navbar.classList.toggle('bg-light');
  navbar.classList.toggle('dark-navbar');
  toDoList.classList.toggle('dark-text');
  completedList.classList.toggle('dark-text');
  modal.classList.toggle('dark');
  themeBtn.classList.toggle('theme-button-dark');
}

function clearTaskLists() {
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }

  while (completedList.firstChild) {
    completedList.removeChild(completedList.firstChild);
  }
}

function countTasksNumber() {
  let toDoCounter = 0;
  let completedCounter = 0;

  tasks.list.forEach(el => {
    el.isComplete ? completedCounter++ : toDoCounter++;
  });

  toDoTitle.textContent = `ToDo (${toDoCounter})`;
  completedTitle.textContent = `Completed (${completedCounter})`;
}

function clearForm() {
  form.reset();
  form.addBtn.textContent = 'Add task';
}

function completeTask(id) {
  tasks.list.forEach(el => {
    if (el.id === id) {
      el.isComplete = !el.isComplete;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });

  renderTasksList();
}

function deleteTask(id) {
  let index = tasks.list.findIndex(el => el.id === id);

  tasks.list.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasksList();
}

function addTask() {
  let task = {
    id: Date.now(),
    title: form.inputTitle.value,
    text: form.inputText.value,
    priority: form.elements.gridRadios.value,
    color: form.color.value,
    isComplete: false,
  };

  tasks.list.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasksList();
}

function editTask(task) {
  form.inputTitle.value = task.title;
  form.inputText.value = task.text;
  form.color.value = task.color;
  form.elements.gridRadios.value = task.priority;
  form.addBtn.textContent = 'Save changes';
  tasks.selectedTask = task.id;

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveChange() {
  tasks.list.forEach(element => {
    if (element.id === tasks.selectedTask) {
      element.title = form.inputTitle.value;
      element.text = form.inputText.value;
      element.priority = form.elements.gridRadios.value;
      element.color = form.color.value;
    }
  });

  tasks.selectedTask = null;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasksList();
}

function renderTasksList() {
  clearTaskLists();
  countTasksNumber();

  tasks.list.forEach(element => {
    const clone = taskTemplate.content.cloneNode(true);
    const li = clone.getElementById('li');
    const taskTitle = clone.getElementById('task-title');
    const taskPriority = clone.getElementById('task-priority');
    const taskDate = clone.getElementById('task-date');
    const taskText = clone.getElementById('task-text');
    const completeBtn = clone.getElementById('complete-btn');
    const editBtn = clone.getElementById('edit-btn');
    const deleteBtn = clone.getElementById('delete-btn');
    
    li.style.background = element.color;
    taskTitle.textContent = element.title;
    taskPriority.textContent = element.priority + ' priority';
    taskDate.textContent = getDate(element.id);
    taskText.textContent = element.text;
    
    deleteBtn.addEventListener('click', () => deleteTask(element.id));
    completeBtn.addEventListener('click', () => completeTask(element.id));

    if (element.isComplete) {
      completeBtn.textContent = 'Incomplete';
      completeBtn.style.marginBottom = '10px'
      editBtn.remove();
      completedList.prepend(clone);
    } else {
      editBtn.addEventListener('click', () => editTask(element));
      toDoList.prepend(clone);
    }
  });
}

// ============== events =============== //

descendingSortBtn.addEventListener('click', () => {
  tasks.list = sortDescending(tasks.list);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasksList();
});

ascendingSortBtn.addEventListener('click', () => {
  tasks.list = sortAscending(tasks.list);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasksList();
});

form.addBtn.addEventListener('click', () => {
  (tasks.selectedTask) ? saveChange() : addTask();
});

closeButtons.forEach(el => el.addEventListener('click', clearForm));

themeBtn.addEventListener('click', changeTheme);

// ============= page launch ============= //

renderTasksList();