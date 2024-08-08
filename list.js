document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Carregar tarefas do Local Storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToList(task.text, task.completed));
    };

    // Adicionar tarefa à lista
    const addTaskToList = (taskText, completed = false) => {
        const li = document.createElement('li');
        li.textContent = taskText;

        if (completed) {
            li.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        li.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        taskList.appendChild(li);
    };

    // Salvar tarefas no Local Storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            tasks.push({
                text: taskItem.firstChild.textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Evento de envio do formulário
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText) {
            addTaskToList(taskText);
            saveTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    });

    // Carregar tarefas ao inicializar
    loadTasks();
});
