let tasks = Array();

function createTask(title, description, dueDate) {
    let checked = false;
    const getTitle = () => title
    const getDescription = () => description
    const getDueDate = () => dueDate
    const isChecked = () => checked;

    const toggleCheck = () => checked = !checked;

    return { getTitle, getDescription, getDueDate, 
             isChecked, toggleCheck}
}

let work = createTask("i want bathroom", "it is nesseccary", "nooowww");
tasks[0] = work;