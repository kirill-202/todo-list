import { Project } from "./project-class.js";
import { Task } from "./task-class.js";
import { populateTasks, addProjectToNavBar, createTaskElement } from "./dom-utils.js";

const Listeners = {
    openNewProjectForm() {
        document.querySelector(".create-project").addEventListener("click", () => projectModal.showModal());
    },

    submitNewProject(projects) {
        document.getElementById("createProjectForm").addEventListener("submit", (event) => this._handleSubmitProject(event, projects));
    },

    openNewTaskForm() {
        document.querySelector(".create-task").addEventListener("click", () => taskModal.showModal());
    },

    closeNewTaskForm() {
        document.querySelector("#closeTaskModal").addEventListener("click", () => taskModal.close());
    },

    submitNewTask(getCurrentProject) {
        document.getElementById("createTaskForm").addEventListener("submit", (event) => this._handleSubmitTask(event, getCurrentProject()));
    },

    _handleSubmitTask(event, project) {
        event.preventDefault();

        const title = document.getElementById("taskTitle").value.trim();
        const description = document.getElementById("taskDescription").value.trim();
        const dueDate = document.getElementById("taskDueDate").value; 
        const priority = document.getElementById("taskPriority").value;

        const task = project.addTask(title, description, dueDate, priority);
        createTaskElement(task);
        populateTasks(project);
        taskModal.close();
        document.getElementById("createTaskForm").reset();
    },

    _handleSubmitProject(event, projects) {
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
    },

    populateCurrentProjectTasks(setCurrentProject, projects) {
        document.querySelector(".nav-bar").addEventListener("click", (event) => {
            if (!event.target.classList.contains("nav-project")) return;

            document.querySelectorAll(".nav-project").forEach(projectTab => projectTab.classList.remove("active-project"));
            event.target.classList.add("active-project");

            const project = projects.find(p => p.id === event.target.dataset.projectId);
            if (project) {
                setCurrentProject(project);
                populateTasks(project);
            }
        });
    },

    changeTaskStatus(getCurrentProject) {
        document.addEventListener("change", (event) => {
            if (event.target.classList.contains("task-status")) {
                const taskElement = event.target.closest(".task");
                if (!taskElement) return;

                const project = getCurrentProject();
                const task = project.getTask(taskElement.id);
                task.changeTaskStatus(event.target.value);

                const targetColumnId = task.status.toLowerCase().replace(" ", "-");
                const targetColumn = document.getElementById(targetColumnId);
                if (targetColumn) {
                    targetColumn.appendChild(taskElement);
                }
            }
        });
    }
};

export default Listeners;
