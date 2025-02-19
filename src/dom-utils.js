function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description || "No description"}</p>
        <p>${task.dueDate ? `Due: ${task.dueDate.toDateString()}` : "No due date"}</p>
        <span class="priority-${task.priority.toLowerCase()}">Priority: ${task.priority}</span>
    `;

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