const taskForm = document.getElementById("taskForm");
const sample = document.getElementById("sample")

taskForm.addEventListener('submit', (event) => {
    // prevents page to refresh when you click submit
    event.preventDefault();

    // test
    console.log('Clickahh')
    sample.innerHTML = "asdas";
});

function deleteRow(childEl) {
    // get the closest tr element of childEl
    let getTr = childEl.closest('tr');

    // Remove the row element
    getTr.remove();
}