// TaskManager.js
import ProjectManager from "./ProjectManager";

export default class TaskManager {
  constructor() {
    this.pm = new ProjectManager();
  }

  addTask(title, dueDate, priority, projectName = "Default") {
    let isComplete = false;
    const projectList = this.Project(projectName);
    const id = projectList.length;
    projectList.push({ id, title, dueDate, priority, isComplete });
  }

  displayTasks(projectName = "Default") {
    for (const todos of this.Project(projectName)) console.log(todos);
  }

  getTask(projectName, id) {
    return this.Project(projectName)[id];
  }

  changePriority(projectName, id, priority) {
    const curr = this.Project(projectName);
    curr[id].priority = priority;
  }

  toggleComplete(projectName, id) {
    const curr = this.Project(projectName);
    curr[id].isComplete = !curr[id].isComplete;
  }

  Project(projectName) {
    return this.pm.getProject(projectName);
  }

  getAllProjects() {
    return this.pm.getAllProjects();
  }
}
