import { createTask, deleteTask } from "./index";

const addBtn = document.querySelector(".add-btn")
const templateTask = document.querySelector(".template-task")
const taskList = document.querySelector(".tasks-list")

addBtn.addEventListener("click", () => {
    createTask();
})

function createTaskElement(task) {
    const element = templateTask.cloneNode(true);
    element.classList.remove("template-task");
    element.querySelector(".title").textContent = task.getTitle();
    element.querySelector(".date").textContent = task.getDueDate();
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
        createTaskElement(task);
    })
}

export { updateTasksList }