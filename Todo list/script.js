// Select DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        saveTask(taskText);
        taskInput.value = '';
    }
});

// Load tasks from local storage and display
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
}

// Add a task to the list
function addTask(taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    const taskTextInput = document.createElement('input');
    taskTextInput.type = 'text';
    taskTextInput.value = taskText;
    taskTextInput.setAttribute('readonly', true);
    
    const editButton = document.createElement('button');
    editButton.innerHTML = '✏️';
    editButton.addEventListener('click', () => {
        if (taskTextInput.hasAttribute('readonly')) {
            taskTextInput.removeAttribute('readonly');
            taskTextInput.focus();
            editButton.innerHTML = '💾';
        } else {
            taskTextInput.setAttribute('readonly', true);
            updateTask(taskText, taskTextInput.value);
            editButton.innerHTML = '✏️';
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '🗑️';
    deleteButton.addEventListener('click', () => {
        li.remove();
        deleteTask(taskText);
    });

    li.appendChild(taskTextInput);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Save task to local storage
function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in local storage
function updateTask(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.indexOf(oldText);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Delete task from local storage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
