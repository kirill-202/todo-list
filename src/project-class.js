
import {Task} from "./task-class.js";

class Project {

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


    getTask(taskId) {
        return this.tasks.find(task => task.id === taskId);
    }

    changeProjectName(newName) {
        this.name = newName;
    }
}

export {Project};