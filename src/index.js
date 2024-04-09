import "./style.css"
import { updateTasksList, UpdateGroupList } from "./visual";
import { validateGroup, validateText } from "./validator";

let tasks = [];
let groups = ["daily"];
let curGroup = Number();

const TASKS_STRING = "tasksarr"
const GROUPS_STRING = "groupsarr"

handleStorage();
UpdateGroupList();

function Task(title, description, dueDate, group, checked = false) {
    const getTitle = () => title
    const getDescription = () => description
    const getDueDate = () => dueDate
    const getGroup = () => group
    const isChecked = () => checked;

    const setChecked = (value) => {
        checked = value;
        populateStorage();
    };

    return { getTitle, getDescription, getDueDate,
             getGroup, isChecked, setChecked}
}

function createTask(title, desc, dueDate, group) {
    if(!validateText(title, "Task Title", 1, 20) ||
       !validateText(dueDate, "dueDate", 1)) {
        return false;
    }

    const newTask = Task(title, desc, dueDate, group);
    tasks.push(newTask);
    updateTasksList(tasks);
    populateStorage();
    return true;
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
function getCurGroupIndex() {
    return curGroup;
}
function addGroup(input) {
    if(validateGroup(input)) {
        groups.push(input)
        UpdateGroupList();
        populateStorage();
        return true
    }
    else {
        return false
    }
}
function changeCurGroup(index) {
    curGroup = index;
    updateTasksList(tasks);
}

function handleStorage() {
    if(localStorage.length > 0) {
        getStorage();
    }
}
function populateStorage() {
    for(let i = 0; i < tasks.length; i++) {
        localStorage.setItem(`title${i}`, tasks[i].getTitle())
        localStorage.setItem(`desc${i}`, tasks[i].getDescription())
        localStorage.setItem(`date${i}`, tasks[i].getDueDate())
        localStorage.setItem(`group${i}`, tasks[i].getGroup())
        localStorage.setItem(`checked${i}`, JSON.parse(tasks[i].isChecked()))
    }

    localStorage.setItem("arraylength", tasks.length);
    localStorage.setItem(GROUPS_STRING, JSON.stringify(groups));
}
function getStorage() {
    createTasksObjects();
    groups = JSON.parse(localStorage.getItem(GROUPS_STRING));
}

function createTasksObjects() {
    // let newtask = JSON.parse(localStorage.getItem(TASKS_STRING))
    // console.log(newtask)
    // console.log(newtask.isChecked())
    let length = localStorage.getItem("arraylength")
    for(let i = 0; i < length; i++) {
        let title = localStorage.getItem(`title${i}`)
        let desc = localStorage.getItem(`desc${i}`)
        let date = localStorage.getItem(`date${i}`)
        let group = localStorage.getItem(`group${i}`)
        let checked = JSON.parse(localStorage.getItem(`checked${i}`))

        let newTask = Task(title, desc, date, group, checked)
        tasks.push(newTask);
    }

    updateTasksList(tasks);
}


export { createTask, deleteTask, getGroups, addGroup,
         changeCurGroup, getCurGroup, getCurGroupIndex }