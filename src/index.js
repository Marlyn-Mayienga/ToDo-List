import './styles.css';
import Task, { getTask, updateTaskCompletion } from './modules/task.js';
import TaskStore from './modules/taskstore.js';

const getTasks = () => {
  const list = document.querySelector('.list');
  list.replaceChildren();
  TaskStore.getTasks().forEach((task) => getTask(task));
};

getTasks();

const taskForm = document.querySelector('.task-form');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = document.querySelector('#add-input').value;
  const task = new Task(description, false, TaskStore.getTasks().length);
  TaskStore.addTask(task);
  getTask(task);
  document.querySelector('.add-input').value = null;
});

// RESET//

document.querySelector('.reset-button').addEventListener('click', () => {
  const tasks = [];
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const allItems = document.querySelectorAll('.item');
  allItems.forEach((item) => {
    item.remove();
  });
  document.querySelector('.add-input').value = null;
});

// DONE TASKS //
document.querySelector('.list').addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    const checkboxIndex = e.target.dataset.index;
    const item = document.getElementById(`item-${checkboxIndex}`);
    const taskText = item.querySelector('p');

    taskText.classList.toggle('done');
    item.classList.toggle('item-checked');

    updateTaskCompletion(checkboxIndex);

    const task = TaskStore.getTaskByIndex(checkboxIndex);

    const checkbox = item.querySelector('input');

    const itemAction = item.querySelector('i');
    itemAction.className = '';

    if (task.completed === true) {
      taskText.style.textDecoration = 'line-through';
      checkbox.checked = true;
      itemAction.classList.add('fa', 'fa-trash-alt');
    } else {
      taskText.style.textDecoration = 'none';
      checkbox.checked = false;
      const itemDots = item.querySelector('i');
      itemDots.classList.add('fa', 'fa-ellipsis-v');
    }
  }
});

// --DELETE SINGLE TASK--//

document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-trash-alt')) {
    const { index } = e.target.parentElement.firstChild.dataset;
    const item = document.getElementById(`item-${index}`);

    TaskStore.removeTask(index);

    item.remove();

    getTasks();
  }
});

// -----REMOVE ALL DONE FROM THE LIST-----//

document.querySelector('.clear-button').addEventListener('click', () => {
  const tasks = TaskStore.getTasks();
  const doneTasks = Array.from(document.querySelectorAll('.done'));
  doneTasks.forEach((doneTask) => doneTask.parentElement.remove());
  const uncompletedTasks = [];
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].completed === false) {
      uncompletedTasks.push(tasks[i]);
    }
  }

  for (let i = 0; i < uncompletedTasks.length; i += 1) {
    uncompletedTasks[i].index = i;
  }
  localStorage.setItem('tasks', JSON.stringify(uncompletedTasks));
  getTasks();
});

// -----EDIT-----//

document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('task-text')) {
    const text = e.target;
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.classList.add('edit-input');
    editInput.value = text.textContent;
    text.parentElement.classList.add('editing');
    text.parentElement.replaceChild(editInput, text);

    editInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        editInput.parentElement.classList.remove('editing');

        const { index } = e.target.previousSibling.dataset;
        const task = TaskStore.getTaskByIndex(index);
        task.description = editInput.value;

        text.textContent = editInput.value;
        editInput.parentElement.replaceChild(text, editInput);

        TaskStore.updateTask(task);
      }
    });
  }
});