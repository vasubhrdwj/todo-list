// TaskManager.js
import ProjectManager from "./ProjectManager";

export default class TaskManager {
  constructor() {
    this.pm = new ProjectManager();
    this.taskId = 0;
  }

  addTask(title, dueDate, priority, projectName = "Default") {
    let isComplete = false;
    const projectList = this.Project(projectName);
    const id = this.taskId++;
    projectList.push({ id, title, dueDate, priority, isComplete });
  }

  getTask(projectName, id) {
    return this.Project(projectName)[id];
  }

  deleteTask(projectName, id) {
    const projectList = this.Project(projectName);
    this.pm.projects[projectName] = projectList.filter(
      (task) => task.id !== id
    );
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
