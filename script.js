const taskForm = document.getElementById("taskForm");
const sample = document.getElementById("sample")

taskForm.addEventListener('submit', (event) => {
    // prevents page to refresh when you click submit
    event.preventDefault();

    // test
    console.log('Clickahh')
    sample.innerHTML = "asdas";
});