// Select form and list elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Load tasks from localStorage or start empty
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render all tasks
function renderTasks() {
    list.innerHTML = '';

    tasks.forEach((tasks, index) => {
        const li = document.createElement('li');

        // Swipe-to-delete for touch devices
        let startX = 0;

        li.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        li.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            if (startX - endX > 80) {
                // Swiped left
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            }
        });

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;

        // Task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        if (task.completed) {
            taskSpan.classList.add('completed');
        }
        checkbox.addEventListener('change', () => {
            taskSpan.classList.toggle('completed');
            tasks[index].completed = checkbox.checked;
            saveTasks();
        });

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        // Build task item
        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    // Add new task
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();

        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false});
            saveTasks();
            renderTasks();
            input.value = '';
        }
    });
    
    // Load on page load
    renderTasks();
}