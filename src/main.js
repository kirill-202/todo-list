import "./styles.css";
import "./form.css";
import { Project } from "./project-class.js";
import { openNewProjectForm, submitNewProject, populateCurrentProjectTasks, changeTaskStatus, submitNewTask, closeNewTaskForm, openNewTaskForm } from "./listeners.js";
import { populateTasks, addProjectToNavBar } from "./dom-utils.js";

let CURRENT_PROJECT = null;
const PROJECTS = [];

function setCurrentProject(project) {
    CURRENT_PROJECT = project;
}

openNewProjectForm();
submitNewProject(PROJECTS);
populateCurrentProjectTasks(setCurrentProject, PROJECTS);
changeTaskStatus(() => CURRENT_PROJECT);
submitNewTask(() => CURRENT_PROJECT);
closeNewTaskForm();
openNewTaskForm();

function init() {
    const defaultProject = new Project("Default");
    defaultProject.addTask("Finish report", "Write final report", "2025-03-01", "high");

    CURRENT_PROJECT = defaultProject;
    PROJECTS.push(defaultProject);
    
    addProjectToNavBar(defaultProject);
    populateTasks(defaultProject);

    console.log("Current Project:", CURRENT_PROJECT);
    console.log("All Projects:", PROJECTS);
}

init();