const taskForm = document.getElementById("taskForm");
const tbodyTag = document.getElementById("tbodyTag");
const multiDeleteBtn = document.getElementById("multiple-delete-btn");
const selectAllBox = document.querySelector('#selectAllTask');
const emptyEl = document.getElementById("empty");
let taskId = 0;
let tasks = [];

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
                    <button type="button" class="btn btn-danger delete-btn">Delete</button>
                </td>
            </tr>
        `;

        // {html tag}.inserAdjacentHTML(position, html) - inserts HTML code into a specified position
        tbodyTag.insertAdjacentHTML('beforeend', rowHtml);
    });
}

tbodyTag.addEventListener("click", e => {
    // checks the clicked target if it contains 'delete-btn' class on the button clicked
    if (e.target.classList.contains('delete-btn')) {
        const rowId = e.target.closest('tr').querySelector('.task-checkbox').id;
        
        removeTask(rowId);
    }

    if (e.target.classList.contains('task-checkbox') && !e.target.checked){
        selectAllBox.checked = false;
    }
});

multiDeleteBtn.addEventListener("click", e => {
    // this selects all elements that have checked input tags with class name task-checkbox
    let getCheckboxes = tbodyTag.querySelectorAll('.task-checkbox:checked');

    Object.values(getCheckboxes).forEach(checkbox => {
        removeTask(checkbox.id);
    });
});

// Check or Uncheck all the checkboxes
selectAllBox.addEventListener('click', e => {
    let isChecked = e.target.checked;
    let getCheckboxes = tbodyTag.querySelectorAll('.task-checkbox');

    Object.values(getCheckboxes).forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});

// remove the task on the array
function removeTask (id) {
    tasks = tasks.filter((task) => task.id !== id);

    renderTableData();
}

renderTableData();