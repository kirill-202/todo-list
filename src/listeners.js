import { Project } from "./project-class.js";
import { populateTasks, addProjectToNavBar } from "./dom-utils.js";

function openNewProjectForm() {
    document.querySelector(".create-project").addEventListener("click", () => projectModal.showModal());
}

function submitNewProject(projects) {
    document.getElementById("createProjectForm").addEventListener("submit", (event) => _handleSubmitProject(event, projects));
}

function _handleSubmitProject(event, projects) {
    event.preventDefault();

    const projectName = document.getElementById("projectName").value.trim();
    if (!projectName) {
        alert("Project name cannot be empty!");
        return;
    }

    const project = new Project(projectName);
    projects.push(project);
    addProjectToNavBar(project);

    projectModal.close();
    document.getElementById("createProjectForm").reset();
}

function populateCurrentProjectTasks(setCurrentProject, projects) {
    document.querySelector(".nav-bar").addEventListener("click", event => {
        if (!event.target.classList.contains("nav-project")) return;

        const project = projects.find(p => p.id === event.target.dataset.projectId);
        if (project) {
            setCurrentProject(project);
            populateTasks(project);
        }
    });
}

function changeTaskStatus(getCurrPorject) {
    document.addEventListener("change", (event) => {
        if (event.target.classList.contains("task-status")) {
            const taskElement = event.target.closest(".task");
            console.log("Task Element ID:", taskElement.id);
            if (!taskElement) return;
            const project = getCurrPorject();
            const task = project.getTask(taskElement.id);
            task.changeTaskStatus(event.target.value);

            const targetColumnId = task.status.toLowerCase().replace(" ", "-");
            console.log(targetColumnId);

            const targetColumn = document.getElementById(targetColumnId);
            if (targetColumn) {
                targetColumn.appendChild(taskElement);
            }
        }
    });
}

export { openNewProjectForm, submitNewProject, populateCurrentProjectTasks, changeTaskStatus };