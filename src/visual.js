import { createTask, deleteTask, getGroups,
         addGroup, changeCurGroup, getCurGroup,
         getCurGroupIndex } from "./index";

const addBtn = document.querySelector(".add-btn")
const templateTask = document.querySelector(".template-task")
const taskList = document.querySelector(".tasks-list")
const groupsList = document.querySelector(".groups-list")

const descDialog = document.querySelector(".desc-dialog")

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

let isDescModal = false;

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
document.body.addEventListener("mousedown", () => {
    if(isDescModal) {
        descDialog.close();
        isDescModal = false;
    }
})

function createTaskElement(task) {
    const element = templateTask.cloneNode(true);
    element.classList.remove("template-task");

    element.querySelector(".title").textContent = task.getTitle();
    element.querySelector(".date").textContent = task.getDueDate();
    const checkedElement = element.querySelector(".checked");
    checkedElement.checked = task.isChecked();

    
    checkedElement.addEventListener("click", () => {
        task.setChecked(checkedElement.checked);
    })
    element.querySelector(".remove-btn").
    addEventListener("click", () => {
        deleteTask(task);
    })
    element.querySelector(".expand-btn").
    addEventListener("mouseup", (event) => {
        if(!isDescModal) {
            let mousePosX = event.clientX
            let mousePosY = event.clientY;
            descDialog.style = `top: ${mousePosY}px; left: calc(${mousePosX}px);`
            descDialog.querySelector("p").textContent = task.getDescription();
            descDialog.show();
            
            isDescModal = true;
        }
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
            selectGroup(i);
        })
        groupsList.appendChild(element);
    }
    setGroupsStyle();
}

function selectGroup(i) {
    changeCurGroup(i);
    setGroupsStyle();
}

function setGroupsStyle() {
    for(let i = 0; i < groupsList.childElementCount; i++) {
        groupsList.childNodes[i].classList.remove("selected")
    }
    groupsList.childNodes[getCurGroupIndex()].classList.add("selected")
}

function getNewTaskInfo() {
    const group = groupSelect.value; //string
    const title = titleInput.value;
    const date = dateInput.value;
    const desc = descInput.value;

    createTask(title, desc, date, group)
}


export { updateTasksList, UpdateGroupList }