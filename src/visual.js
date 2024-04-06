import { createTask, deleteTask, getGroups,
         addGroup, changeCurGroup, getCurGroup } from "./index";

const addBtn = document.querySelector(".add-btn")
const templateTask = document.querySelector(".template-task")
const taskList = document.querySelector(".tasks-list")
const groupsList = document.querySelector(".groups-list")

const newGroupBtn = document.querySelector(".new-group-btn")
const groupDialog = document.querySelector(".group-dialog")
const addGroupBtn = document.querySelector("#add-group-btn")
const groupInput = document.querySelector("#group-input")

const taskDialog = document.querySelector(".task-dialog")
const groupSelect = document.querySelector("#select-group")
const titleInput = document.querySelector("#title-input")
const dateInput = document.querySelector("#date-input")
const descInput = document.querySelector("#desc-input")
const createTaskBtn = document.querySelector("#create-task-btn")

addBtn.addEventListener("click", () => {
    UpdateSelectGroupList();
    taskDialog.showModal();
})
newGroupBtn.addEventListener("click", () => {
    groupDialog.showModal();
})
addGroupBtn.addEventListener("click", () => {
    if(addGroup(groupInput.value)) {
        UpdateSelectGroupList();
        groupDialog.close();
    }
})
createTaskBtn.addEventListener("click", () => {
    getNewTaskInfo();
    taskDialog.close();
})

function createTaskElement(task) {
    const element = templateTask.cloneNode(true);
    element.classList.remove("template-task");

    element.querySelector(".title").textContent = task.getTitle();
    element.querySelector(".date").textContent = task.getDueDate();
    element.querySelector(".checked").checked = task.isChecked();

    element.querySelector(".checked").
    addEventListener("click", () => {
        task.toggleCheck();
    })
    element.querySelector(".remove-btn").
    addEventListener("click", () => {
        deleteTask(task);
    })
    taskList.appendChild(element);
}

function updateTasksList(tasks) {
    
    while(taskList.lastChild != null && 
          taskList.lastChild !== templateTask) {
        taskList.removeChild(taskList.lastChild);
    }

    tasks.forEach((task) => {
        if(task.getGroup() === getCurGroup())
        createTaskElement(task);
    })
}

function UpdateSelectGroupList() {
    while(groupSelect.firstChild != null) {
        groupSelect.removeChild(groupSelect.firstChild);
    }

    getGroups().forEach((group) => {
        const item = document.createElement("option")
        item.textContent = group;
        groupSelect.append(item);
    });
}
function UpdateGroupList() {
    while(groupsList.firstChild != null) {
        groupsList.removeChild(groupsList.firstChild);
    }

    for(let i = 0; i < getGroups().length; i++) {
    const element = document.createElement("div");
        element.textContent = getGroups()[i];
        element.addEventListener("click", () => {
            changeCurGroup(i);
        })
        groupsList.appendChild(element);
    }
}

function getNewTaskInfo() {
    const group = groupSelect.value; //string
    const title = titleInput.value;
    const date = dateInput.value;
    const desc = descInput.value;

    createTask(title, desc, date, group)
}

export { updateTasksList, UpdateGroupList }