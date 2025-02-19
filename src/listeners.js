import { Project } from "./project-class.js";
import { populateTasks, addProjectToNavBar } from "./dom-utils.js";

function openNewProjectForm() {
    document.querySelector(".create-project").addEventListener("click", () => projectModal.showModal());
}

function submitNewProject(projects) {
    document.getElementById("createProjectForm").addEventListener("submit", (event) => handleSubmitProject(event, projects));
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

function handleSubmitProject(event, projects) {
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

export { openNewProjectForm, submitNewProject, populateCurrentProjectTasks };