
import {Task} from "./todo-class.js";

class Project {
    static projectColumns = ["To Do", "In Progress", "Done"];

    constructor(name) {
        this.name = name;
        this.id = crypto.randomUUID(); 
        this.tasks = [];    
    }

    addTask(title, description = "", dueDate = "", priority = "low", notes = "") {
        const task = new Task(title, this, description, dueDate, priority, notes);
        this.tasks.push(task);
    }

    deleteTask(taskId) {
        const taskToRemove = this.tasks.find(task => task.id === taskId);
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        return taskToRemove;
    }

    moveTask(taskId, newStatus) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task && Project.projectColumns.includes(newStatus)) {
            task.changeTaskStatus(newStatus);
        } else {
            console.error("Invalid status or task not found");
        }
    }

    getTask(taskId) {
        return this.tasks.find(task => task.id === taskId);
    }

    changeProjectName(newName) {
        this.name = newName;
    }
}

export {Project};