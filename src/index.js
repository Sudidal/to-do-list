import "./style.css"
import { createTaskElement } from "./visual";

let tasks = Array(5);

function createTask(title, description, dueDate, group) {
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

let work = createTask("i want bathroom", "it is nesseccary", "nooowww");
tasks[0] = work;
createTaskElement(work.getTitle(), work.getDueDate());