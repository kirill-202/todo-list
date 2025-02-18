import "./styles.css";
import "./form.css";
import { Project } from "./project-class.js";

let CURRENT_PROJECT = null;
const PROJECTS = [];

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

function handleSubmitProject(event) {
    event.preventDefault();

    const projectName = document.getElementById("projectName").value.trim();
    if (!projectName) {
        alert("Project name cannot be empty!");
        return;
    }

    const project = new Project(projectName);
    PROJECTS.push(project);
    addProjectToNavBar(project);

    projectModal.close();
    document.getElementById("createProjectForm").reset();
}

function addProjectToNavBar(project) {
    const navBar = document.querySelector(".nav-bar");

    const newNavBarProject = document.createElement("div");
    newNavBarProject.classList.add("nav-project");
    newNavBarProject.textContent = project.name;
    newNavBarProject.dataset.projectId = project.id;

    navBar.appendChild(newNavBarProject);
}


document.querySelector(".nav-bar").addEventListener("click", event => {
    if (!event.target.classList.contains("nav-project")) return;

    CURRENT_PROJECT = PROJECTS.find(project => project.id === event.target.dataset.projectId);
    populateTasks(CURRENT_PROJECT);
});


document.querySelector(".create-project").addEventListener("click", () => projectModal.showModal());
document.getElementById("createProjectForm").addEventListener("submit", handleSubmitProject);

function init() {
    const defaultProject = new Project("Default");
    defaultProject.addTask("Finish report", "Write final report", "2025-03-01", "high", "Urgent task");

    CURRENT_PROJECT = defaultProject;
    PROJECTS.push(defaultProject);
    
    addProjectToNavBar(defaultProject);
    populateTasks(defaultProject);

    console.log("Current Project:", CURRENT_PROJECT);
    console.log("All Projects:", PROJECTS);
}

init();