// TaskManager.js
import ProjectManager from "./ProjectManager";

export default class TaskManager {
  constructor() {
    this.projectManager = new ProjectManager();
  }

  addTask(title, dueDate, priority, projectName = "default") {
    let isComplete = false;
    const projectList = this.Project(projectName);
    const id = projectList.length;
    projectList.push({ id, title, dueDate, priority, isComplete });
  }

  getTask(projectName = "default") {
    for (const todos of this.Project(projectName)) console.log(todos);
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
    return this.projectManager.getProject(projectName);
  }

  test() {
    this.projectManager.display();
  }
}
