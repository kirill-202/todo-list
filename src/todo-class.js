class Task {

    static allowedStatuses = ["To Do", "In Progress", "Done"];

    static validatePriority(priority) {
        const validPriorities = ["low", "medium", "high"];
        return validPriorities.includes(priority) ? priority : "low";
    }

    constructor(title, project, description = "", dueDate = "", priority = "low", notes = "") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate ? new Date(dueDate) : null;
        this.priority = Task.validatePriority(priority);
        this.notes = notes;
        this.project = project;
        this.status = "To Do";
        this.id = crypto.randomUUID(); 
    }

    setDescription(newDescription) {
        this.description = newDescription;
        return this;  
    }

    setDueDate(newDueDate) {
        this.dueDate = new Date(newDueDate);
        return this;
    }

    setPriority(newPriority) {
        this.priority = Task.validatePriority(newPriority);
        return this;
    }

    setNotes(newNotes) {
        this.notes = newNotes;
        return this;
    }

    updateTitle(newTitle) {
        this.title = newTitle;
        return this;
    }

    moveTaskToProject(project) {
        this.project = project;
    }

    changeTaskStatus(newStatus) {
        if (Task.allowedStatuses.includes(newStatus)) {
            this.status = newStatus;
        } else {
            throw new Error(`${newStatus} is not allowed as a status for a todo task.`)
        }
    }
}


export {Task};