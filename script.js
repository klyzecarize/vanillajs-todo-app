const taskForm = document.getElementById("taskForm");
const tbodyTag = document.getElementById("tbodyTag");
const multiDeleteBtn = document.getElementById("multiple-delete-btn");
const selectAllBox = document.querySelector('#selectAllTask');
let taskId = 0;
let tasks = [];

function init() {
    loadTasksList();
    renderTableData();
}

taskForm.addEventListener('submit', (event) => {
    const form = event.target;

    // prevents page to refresh when you click submit
    event.preventDefault();

    if (form.inputTask.value != "") {
        let taskData = {
            id: taskId,
            task: form.inputTask.value
        }

        tasks.push(taskData);

        taskId++;

        saveTasksList();

        renderTableData();

        form.inputTask.value = "";
    } else {
        alert("Value empty!") ;
    }
});

function renderTableData () {
    // this will remove all the elements inside the tbodyTag
    tbodyTag.innerHTML = "";

    if (tasks.length === 0) {
        const rowHtml = `
            <tr>
                <td id="empty" colspan="3">
                    Empty
                </td>
            </tr>
        `;

        tbodyTag.innerHTML = rowHtml;

        selectAllBox.checked = false;
        return;
    }

    tasks.forEach(task => {
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

        // {html tag}.inserAdjacentHTML(position, html) - inserts HTML code into a specified position
        tbodyTag.insertAdjacentHTML('beforeend', rowHtml);
    });
}

tbodyTag.addEventListener("click", ({target}) => {
    // checks the clicked target if it contains 'delete-btn' class on the button clicked
    if (target.classList.contains('delete-btn')) {
        // Changed to metadata or custom data attributes
        const data = target.dataset;
        
        removeTask(data.id);
    }

    if (target.classList.contains('task-checkbox') && !target.checked){
        selectAllBox.checked = false;
    }
});

multiDeleteBtn.addEventListener("click", () => {
    // this selects all elements that have checked input tags with class name task-checkbox
    let getSelectedCheckboxes = getCheckboxes(true);

    Object.values(getSelectedCheckboxes).forEach(checkbox => {
        removeTask(checkbox.id);
    });
});

// Check or Uncheck all the checkboxes
selectAllBox.addEventListener('click', ({target}) => {
    let isChecked = target.checked;
    let getAllCheckboxes = getCheckboxes();

    Object.values(getAllCheckboxes).forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});

// To get checkboxes
function getCheckboxes (getChecked = false) {
    return tbodyTag.querySelectorAll(
        getChecked ? '.task-checkbox:checked' : '.task-checkbox'
    );
}

// remove the task on the array
function removeTask (id) {
    tasks = tasks.filter((task) => task.id != id);

    saveTasksList();

    renderTableData();
}

function saveTasksList () {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // this is the id for now
    localStorage.setItem('lastId', JSON.stringify(taskId));
}

function loadTasksList () {
    const getTasks = localStorage.getItem('tasks');
    const getLastTaskId = localStorage.getItem('lastId');
    tasks = getTasks ? JSON.parse(getTasks) : [];
    taskId = getLastTaskId ? JSON.parse(getLastTaskId) : 0;
}

init();