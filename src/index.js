import "./style.css"
import { updateTasksList, UpdateGroupList } from "./visual";

let tasks = Array();
let groups = ["daily"];
let curGroup = Number();

UpdateGroupList();

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

function createTask(title, desc, dueDate, group) {
    const newTask = Task(title, desc, dueDate, group);
    tasks.push(newTask);
    updateTasksList(tasks);
}
function deleteTask(task) {
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    updateTasksList(tasks);
}

function getGroups() {
    return groups;
}
function getCurGroup() {
    return groups[curGroup];
}
function addGroup(input) {
    groups.forEach((group) => {
        if(group == input)
        {
            console.error("Group already exist");
            return false
        }
    });
    groups.push(input)
    UpdateGroupList();
    console.log(groups)
    return true;
}
function changeCurGroup(index) {
    curGroup = index;
    updateTasksList(tasks);
}



export { createTask, deleteTask, getGroups, addGroup,
         changeCurGroup, getCurGroup }