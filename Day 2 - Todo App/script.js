document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const errorMsg = document.getElementById('errorMsg');
    const pendingCount = document.getElementById('pendingCount');
    const completedCount = document.getElementById('completedCount');

    // State
    let tasks = [];

    // Add task function
    const addTask = () => {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            showError();
            return;
        }

        hideError();

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        renderTask(task);
        updateCounter();

        taskInput.value = '';
        taskInput.focus();
    };

    // Render single task
    const renderTask = (task) => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (task.completed) li.classList.add('completed');
        li.dataset.id = task.id;

        const span = document.createElement('span');
        span.classList.add('task-text');
        span.textContent = task.text;

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('task-actions');

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.addEventListener('click', () => toggleComplete(task.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(deleteBtn);
        li.appendChild(span);
        li.appendChild(actionsDiv);

        taskList.appendChild(li);
    };

    // Toggle task completion
    const toggleComplete = (id) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        task.completed = !task.completed;

        const taskItem = document.querySelector(`[data-id="${id}"]`);
        if (taskItem) {
            taskItem.classList.toggle('completed');
            const completeBtn = taskItem.querySelector('.complete-btn');
            completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        }

        updateCounter();
    };

    // Delete task
    const deleteTask = (id) => {
        tasks = tasks.filter(t => t.id !== id);

        const taskItem = document.querySelector(`[data-id="${id}"]`);
        if (taskItem) {
            taskItem.style.animation = 'fadeOut 0.3s ease-out forwards';
            taskItem.addEventListener('animationend', () => taskItem.remove());
        }

        updateCounter();
    };

    // Update task counter
    const updateCounter = () => {
        const pending = tasks.filter(t => !t.completed).length;
        const completed = tasks.filter(t => t.completed).length;

        pendingCount.textContent = `${pending} task${pending !== 1 ? 's' : ''} pending`;
        completedCount.textContent = `${completed} completed`;
    };

    // Show/hide error
    const showError = () => {
        errorMsg.classList.add('show');
        taskInput.style.borderColor = '#e74c3c';
        setTimeout(hideError, 3000);
    };

    const hideError = () => {
        errorMsg.classList.remove('show');
        taskInput.style.borderColor = '#e0e0e0';
    };

    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Add fadeOut animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(20px);
            }
        }
    `;
    document.head.appendChild(style);
});