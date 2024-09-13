function addTask() {
    const task = {
        title: document.getElementById('new-task').value,
        description: document.getElementById('task-description').value,
        assignee: document.getElementById('task-assignee').value,
        priority: document.getElementById('task-priority').value
    };
    
    if (!task.title || !task.description || !task.assignee) return;
    
    createTaskElement(task);
    saveTask(task);
    resetForm();
}

function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.className = task.priority;

    const taskTitle = document.createElement('strong');
    taskTitle.textContent = task.title;

    const taskDescription = document.createElement('p');
    taskDescription.textContent = task.description;

    const taskAssignee = document.createElement('p');
    taskAssignee.textContent = `Assigner à: ${task.assignee}`;

    const taskPriority = document.createElement('p');
    taskPriority.textContent = `Priorité: ${task.priority}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Modifier';
    editButton.onclick = () => toggleEdit(listItem, editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = () => {
        listItem.remove();
        updateTasks();
    };

    listItem.append(taskTitle, taskDescription, taskAssignee, taskPriority, editButton, deleteButton);
    document.getElementById('task-list').appendChild(listItem);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(createTaskElement);
}

function resetForm() {
    document.getElementById('new-task').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-assignee').value = '';
    document.getElementById('task-priority').value = 'faible';
}

function toggleEdit(listItem, editButton) {
    const isEditable = listItem.contentEditable === 'true';
    listItem.contentEditable = !isEditable;
    editButton.textContent = isEditable ? 'Modifier' : 'Enregistrer';
}

function updateTasks() {
    const tasks = Array.from(document.querySelectorAll('#task-list li')).map(listItem => ({
        title: listItem.querySelector('strong').textContent,
        description: listItem.querySelector('p').textContent,
        assignee: listItem.querySelectorAll('p')[1].textContent.replace('Assigner à: ', ''),
        priority: listItem.className
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
document.addEventListener('DOMContentLoaded', loadTasks);

