class TodoApp {
    constructor () {
        this.taskForm = document.getElementById('taskForm');
        this.tbodyTag = document.getElementById('tbodyTag');
        this.multiDeleteBtn = document.getElementById('multiple-delete-btn');
        this.taskFormModal = document.getElementById('taskFormModal');
        this.modalFormInput = this.taskFormModal.querySelector('.modal-body input');
        this.modalFormSubmit = this.taskFormModal.querySelector('.modal-footer button[type="submit"]');
        this.selectAllBox = document.querySelector('#selectAllTask');
        this.taskId = 0;
        this.tasks = [];

        // event listeners
        this.taskForm.addEventListener('submit', this.handleSubmit.bind(this));
        this.tbodyTag.addEventListener('click', this.tbodyClick.bind(this));
        this.multiDeleteBtn.addEventListener('click', this.multiDeleteClick.bind(this));
        this.selectAllBox.addEventListener('click', this.selectAllClick.bind(this));
        this.taskFormModal.addEventListener('show.bs.modal', this.modalClick.bind(this))

        this._init()
    }

    _init() { 
        this.loadTasksList();
        this.renderTableRow();
    }

    modalClick (event) {
        const button = event.relatedTarget;

        const getId = button.getAttribute('data-bs-id');
        const getFormType = button.getAttribute('data-bs-formType');

        this.modalFormSubmit.dataset.formType = getFormType;

        if (getFormType === 'edit') {
            const [taskValue] = this.findTask(getId);

            this.modalFormInput.value = taskValue.task;
            this.modalFormSubmit.dataset.id = getId;
            return;
        }

        this.modalFormInput.value = "";

    }

    handleSubmit (event) {
        const form = event.target;
        const submitDataset = this.modalFormSubmit.dataset
        
        // prevents page from refreshing
        event.preventDefault();


        if (form.inputTask.value !== "") {
            let taskData = {
                id: this.taskId,
                task: form.inputTask.value
            };

            switch (submitDataset.formType) {
                case 'add':
                    this.saveTask(taskData);
                    break;
                case 'edit':
                    taskData = {
                        id: submitDataset.id,
                        task: form.inputTask.value
                    }

                    this.saveTask(false, taskData);
                    break;
            }

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
                        <button type="button" class="btn btn-primary edit-btn" data-bs-toggle="modal" data-bs-target="#taskFormModal" data-bs-id="${task.id}" data-bs-formType="edit">Edit</button>
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

    saveTask (isAdd = true,  taskData) {
        if (isAdd) {
            this.tasks.push(taskData);

            this.taskId++;
        } else {
            this.tasks.map(task => {
                if(task.id == taskData.id) {
                    task.task = taskData.task;
                }
            });
        }

        this.saveTasksList();

        this.renderTableRow();

    }

    findTask (id) {
        const foundTask = this.tasks.filter(task => task.id == id );

        return [...foundTask]
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