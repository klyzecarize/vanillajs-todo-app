const taskForm = document.getElementById("taskForm");
const tbodyTag = document.getElementById("tbodyTag");
const emptyEl = document.getElementById("empty");
let taskId = 0;

taskForm.addEventListener('submit', (event) => {
    const form = event.target;

    // prevents page to refresh when you click submit
    event.preventDefault();

    if (form.inputTask.value != "") {
        addTableRow(form.inputTask.value)

        form.inputTask.value = "";
    } else {
        alert("Value empty!") ;
    }

    
});

// placed for multiple deletion
function deleteRow(childEl) {
    removeRow(childEl);
}

function addTableRow (taskValue) {
    emptyEl != null && removeRow(emptyEl);
    
    // template for row
    const rowHtml = `
        <tr>
            <td>
                <input type="checkbox" name="${taskId}" id="${taskId}">
            </td>
            <td>${taskValue}</td>
            <td>
                <button type="button" class="btn btn-danger delete-btn">Delete</button>
            </td>
        </tr>
    `;

    // {html tag}.inserAdjacentHTML(position, html) - inserts HTML code into a specified position
    tbodyTag.insertAdjacentHTML('beforeend', rowHtml);

    taskId++;
}

tbodyTag.addEventListener("click", e => {
    // checks the clicked target if it contains 'delete-btn' class on the button clicked
    if (e.target.classList.contains('delete-btn')) {
        removeRow(e.target);
    }

    console.log(e.target.id);
});



function removeRow (childEl) {
    // get the closest tr element of childEl
    let getTr = childEl.closest('tr');

    // Remove the row element
    getTr.remove();

}