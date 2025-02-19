import {Task} from "./task-class.js";

function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.id = task.id;

    taskElement.innerHTML = `
        <input type="text" class="task-title" value="${task.title}" data-task-id="${task.id}">
        <textarea class="task-description" data-task-id="${task.id}">${task.description || "No description"}</textarea>
        <div class="due-date-container">
            <span class="due-date-text">Due Date</span>
            <input type="date" class="task-due-date" value="${task.dueDate ? task.dueDate.toISOString().split('T')[0] : ''}" data-task-id="${task.id}" title="Due date">
        </div>      
        
        <select class="task-priority" data-task-id="${task.id}">
            <option value="low" ${task.priority === "low" ? "selected" : ""}>Low</option>
            <option value="medium" ${task.priority === "medium" ? "selected" : ""}>Medium</option>
            <option value="high" ${task.priority === "high" ? "selected" : ""}>High</option>
        </select>

        <select class="task-status" data-task-id="${task.id}">
            ${Task.allowedStatuses.map(status => 
                `<option value="${status}" ${task.status === status ? "selected" : ""}>${status}</option>`
            ).join("")}
        </select>
    `;

    taskElement.querySelector(".task-title").addEventListener("input", (event) => {
        task.updateTitle(event.target.value);
    });

    taskElement.querySelector(".task-description").addEventListener("input", (event) => {
        task.setDescription(event.target.value);
    });

    taskElement.querySelector(".task-due-date").addEventListener("change", (event) => {
        task.setDueDate(event.target.value);
    });

    taskElement.querySelector(".task-priority").addEventListener("change", (event) => {
        task.setPriority(event.target.value);
    });

    taskElement.querySelector(".task-status").addEventListener("change", (event) => {
        task.changeTaskStatus(event.target.value);
    });

    return taskElement;
}
function populateTasks(project) {
    const columns = document.querySelectorAll(".column");
    columns.forEach(column => {
        column.innerHTML = ""; // Clear tasks before repopulating
        let columnIdFormatted = column.id.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());

        project.tasks
            .filter(task => task.status === columnIdFormatted)
            .forEach(task => column.appendChild(createTaskElement(task)));
    });
}

function addProjectToNavBar(project) {
    const navBar = document.querySelector(".nav-bar");

    const newNavBarProject = document.createElement("div");
    newNavBarProject.classList.add("nav-project");
    newNavBarProject.textContent = project.name;
    newNavBarProject.dataset.projectId = project.id;

    navBar.appendChild(newNavBarProject);
}

export { createTaskElement, populateTasks, addProjectToNavBar };