import "./style.css"
import { updateTasksList } from "./visual";

let tasks = Array();

function Task(title, description, dueDate, group) {
    let checked = false;
    const getTitle = () => title
    const getDescription = () => description
    const getDueDate = () => dueDate
    const getGroup = () => group
    const isChecked = () => checked;

    const toggleCheck = () => checked = !checked;

    return { getTitle, getDescription, getDueDate, 
             getGroup, isChecked, toggleCheck}
}

let i = 0;
function createTask() {
    i++;
    const newTask = Task(`task.${i}`, "amazing task", "not now", "unimportant group");
    tasks.push(newTask);
    updateTasksList(tasks);
}
function deleteTask(task) {
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    updateTasksList(tasks);
}


export { createTask, deleteTask }