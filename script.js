const taskForm = document.getElementById("taskForm");
const tbodyTag = document.getElementById("tbodyTag");
const emptyEl = document.getElementById("empty");
let sampleInt = 0;

taskForm.addEventListener('submit', (event) => {
    const form = event.target;

    // prevents page to refresh when you click submit
    event.preventDefault();

    addTableRow(form.inputTask.value);

    form.inputTask.value = "";
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
                <input type="checkbox" name="${sampleInt}" id="${sampleInt}">
            </td>
            <td>${sampleInt}</td>
            <td>${taskValue}</td>
            <td>
                <button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button>
            </td>
        </tr>
    `;

    // {html tag}.inserAdjacentHTML(position, html) - inserts HTML code into a specified position
    // tbodyTag.insertAdjacentHTML('beforeend', rowHtml);
    tbodyTag.innerHTML += rowHtml;

    sampleInt++;
}

function removeRow (childEl) {
    // get the closest tr element of childEl
    let getTr = childEl.closest('tr');

    // Remove the row element
    getTr.remove();

}