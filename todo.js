class TodoApp {
    constructor () {
        this.taskForm = document.getElementById('taskForm');
        this.tbodyTag = document.getElementById('tbodyTag');
        this.multiDeleteBtn = document.getElementById('multiple-delete-btn');
        this.selectAllBox = document.querySelector('#selectAllTask');
        this.taskId = 0;
        this.tasks = [];

        // form event listener
        this.taskForm.addEventListener('submit', this.handleSubmit.bind(this));

        // tbody event listener
        this.tbodyTag.addEventListener('click', this.tbodyClick.bind(this));

        // multi delete event listener
        this.multiDeleteBtn.addEventListener('click', this.multiDeleteClick.bind(this));
        
        // select all checkboxes event listener
        this.selectAllBox.addEventListener('click', this.selectAllClick.bind(this));
    
        this._init()
    }

    _init() { 
        this.loadTasksList();
        this.renderTableRow();
    }

    handleSubmit (event) {
        const form = event.target;

        // prevents page from refreshing
        event.preventDefault();

        if (form.inputTask.value !== "") {
            let taskData = {
                id: this.taskId,
                task: form.inputTask.value
            };

            this.tasks.push(taskData);

            this.taskId++;

            this.saveTasksList();

            this.renderTableRow();

            form.inputTask.value = "";
        }
    }

    renderTableRow () {
        this.tbodyTag.innerHTML = "";

        if (this.tasks.length === 0) {
            const rowHtml = `
                <tr>
                    <td id="empty" colspan="3">
                        Empty
                    </td>
                </tr>
            `;

            this.tbodyTag.innerHTML = rowHtml;

            this.selectAllBox.checked = false;
            return;
        }
        
        this.tasks.forEach( task => {
            const rowHtml = `
                <tr>
                    <td>
                        <input type="checkbox" class="task-checkbox" name="${task.id}" id="${task.id}">
                    </td>
                    <td>${task.task}</td>
                    <td>
                        <button type="button" class="btn btn-danger delete-btn" data-id="${task.id}">Delete</button>
                    </td>
                </tr>
            `;

            this.tbodyTag.insertAdjacentHTML('beforeend', rowHtml);
        });
    }

    tbodyClick ({target}) {
        const checkClass = target.classList;

        if (checkClass.contains('delete-btn')) {
            const data = target.dataset;

            this.removeTask(data.id);
        }

        if (checkClass.contains('task-checkbox') && !target.checked) {
            this.selectAllBox.checked = false;
        }
    }

    selectAllClick ({target}) {
        let isChecked = target.checked;
        let getAllCheckboxes = this.getCheckboxes();

        [...getAllCheckboxes].forEach( checkbox => {
            checkbox.checked = isChecked;
        });
    }

    multiDeleteClick () {
        let getSelectedCheckboxes = this.getCheckboxes(true);

        [...getSelectedCheckboxes].forEach( checkbox => {
            this.removeTask(checkbox.id);
        });
    }

    removeTask (id) {
        this.tasks = this.tasks.filter((task) => task.id != id);

        this.saveTasksList();

        this.renderTableRow();
    }

    saveTasksList () {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('lastId', JSON.stringify(this.taskId));
    }

    loadTasksList () {
        const getTasks = localStorage.getItem('tasks');
        const getLastTaskId = localStorage.getItem('lastId');

        this.tasks = getTasks ? JSON.parse(getTasks) : [];
        this.taskId = getLastTaskId ? JSON.parse(getLastTaskId) : 0;
    }

    getCheckboxes (getChecked = false) {
        return this.tbodyTag.querySelectorAll(
            getChecked ? '.task-checkbox:checked' : '.task-checkbox'
        );
    }
}

let work = new TodoApp();