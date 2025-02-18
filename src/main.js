import "./styles.css";
import "./form.css";
import {Project} from "./project-class.js"

let CURRENT_PROJECT = {};
const PROJECTS = [];

function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const title = document.createElement("h3");
    title.textContent = task.title;

    const description = document.createElement("p");
    description.textContent = task.description || "No description";

    const dueDate = document.createElement("p");
    dueDate.textContent = task.dueDate ? `Due: ${task.dueDate.toDateString()}` : "No due date";

    const priority = document.createElement("span");
    priority.textContent = `Priority: ${task.priority}`;
    priority.classList.add(`priority-${task.priority.toLowerCase()}`);

    taskElement.appendChild(title);
    taskElement.appendChild(description);
    taskElement.appendChild(dueDate);
    taskElement.appendChild(priority);

    return taskElement;
}

function poplulateTasks(project) {
    const columns = document.querySelectorAll(".column");
    columns.forEach((column) => {
        
        // change column id from to-do to To Do for a match.
        let column_id_formatted = column.id.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());
        let matchedTasks = project.tasks.filter((task) => task.status === column_id_formatted);
        matchedTasks.forEach((task) => {
            let taskElem = createTaskElement(task);
            column.appendChild(taskElem);
        })

    })
}

function handleSubmitProject(event) {
    event.preventDefault(); 

    const projectName = document.getElementById("projectName").value;

    if (projectName.trim() === "") {
        alert("Project name cannot be empty!");
        return;
    }

    const project = new Project(projectName);
    PROJECTS.push(project);

    addProjectToNavBar(project);
    projectModal.close();
    const form = document.getElementById("createProjectForm");
    form.reset();  
}

function addProjectToNavBar(project) {

    const newNavBarProject = document.createElement("div");
    newNavBarProject.classList.add("nav-project");
    newNavBarProject.textContent = project.name;
    newNavBarProject.id = project.id;

    const navBar = document.querySelector(".nav-bar");
    navBar.appendChild(newNavBarProject);
}


const newProjectButton = document.querySelector(".create-project");
newProjectButton.addEventListener("click", () => {
    projectModal.showModal();
});

const form = document.getElementById("createProjectForm");
form.addEventListener("submit", handleSubmitProject);

document.addEventListener("click", (event) =>  {
    if (event.target.classList.contains("nav-project")) {
        CURRENT_PROJECT = PROJECTS.find(project => project.id === event.target.id);
        const columns = document.querySelectorAll(".column");
        columns.forEach((column) => column.innerHTML = "");
        poplulateTasks(CURRENT_PROJECT);
    }
}
)

function init() {
    const defaultProject = new Project("Default");
    defaultProject.addTask("Finish report", "Write final report", "2025-03-01", "high", "Urgent task");
    CURRENT_PROJECT = defaultProject;
    PROJECTS.push(defaultProject);
    poplulateTasks(defaultProject);
    addProjectToNavBar(defaultProject);

    console.log("Current Project:", CURRENT_PROJECT);
    console.log("All Projects:", PROJECTS);
    console.log("Tasks in Current Project:", CURRENT_PROJECT.tasks);

}

init();