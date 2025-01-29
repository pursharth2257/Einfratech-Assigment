let tasks = [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        
        const taskContainer = document.createElement('div');
        taskContainer.style.display = 'flex';
        taskContainer.style.alignItems = 'center';
        taskContainer.style.gap = '10px';
        taskContainer.style.width = '100%';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleTaskCompletion(index);
        taskContainer.appendChild(checkbox);

        const span = document.createElement('span');
        span.textContent = task.text;
        span.style.flexGrow = '1';
        if (task.completed) {
            span.classList.add('completed');
            span.style.textDecoration = 'line-through';
        }
        taskContainer.appendChild(span);

        li.appendChild(taskContainer);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.onclick = () => editTask(index);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteTask(index);
        
        if (window.innerWidth < 500) {
            editButton.style.display = 'block';
            editButton.style.width = '100%';
            deleteButton.style.display = 'block';
            deleteButton.style.width = '100%';
            li.style.display = 'flex';
            li.style.flexDirection = 'column';
            li.style.alignItems = 'flex-start';
            li.style.gap = '5px';
        } else {
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.gap = '10px';
            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);
            li.appendChild(buttonContainer);
        }
        
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    } else {
        alert('Please enter a task');
    }
}

function editTask(index) {
    const newTask = prompt('Edit the task:', tasks[index].text);
    if (newTask !== null) {
        tasks[index].text = newTask.trim();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

window.addEventListener('resize', renderTasks);
renderTasks();