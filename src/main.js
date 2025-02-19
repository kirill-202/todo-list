import "./styles.css";
import "./form.css";
import { Project } from "./project-class.js";
import Listeners from "./listeners.js";
import { populateTasks, addProjectToNavBar } from "./dom-utils.js";

let CURRENT_PROJECT = null;
const PROJECTS = [];

function setCurrentProject(project) {
    CURRENT_PROJECT = project;
}

function getCurrentProject() {
    return CURRENT_PROJECT;
}

function init() {
    const defaultProject = new Project("Default");
    defaultProject.addTask("Finish report", "Write final report", "2025-03-01", "high");

    setCurrentProject(defaultProject);
    PROJECTS.push(defaultProject);

    addProjectToNavBar(defaultProject);
    populateTasks(defaultProject);
}

document.addEventListener("DOMContentLoaded", () => {
    init();

    Listeners.openNewProjectForm();
    Listeners.submitNewProject(PROJECTS);
    Listeners.openNewTaskForm();
    Listeners.closeNewTaskForm();
    Listeners.submitNewTask(getCurrentProject);
    Listeners.populateCurrentProjectTasks(setCurrentProject, PROJECTS);
    Listeners.changeTaskStatus(getCurrentProject);
});
