import "./styles.css";
import "./form.css";
import {Project} from "./project-class.js"

let CURRENT_PROJECT = "";
const PROJECTS = [];




function handleSubmit(event) {
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
form.addEventListener("submit", handleSubmit);