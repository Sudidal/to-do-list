const templateTask = document.querySelector(".template-task")
const taskList = document.querySelector(".tasks-list")

function createTaskElement(title, date) {
    const element = templateTask.cloneNode(true);
    element.classList.remove("template-task");
    element.querySelector(".title").textContent = title;
    element.querySelector(".date").textContent = date;
    taskList.appendChild(element);
}

export {createTaskElement}