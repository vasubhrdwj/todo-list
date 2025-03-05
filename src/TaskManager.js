// TaskManager.js


import ProjectManager from "./ProjectManager";

export default class TaskManager {
  constructor() {
    this.projectManager = new ProjectManager();
  }

  addTask(title, dueDate, priority, projectName = "default") {
    let isComplete = false;
    const projectList = this.projectManager.getProject(projectName);
    projectList.push({ title, dueDate, priority, isComplete });
  }

  getTask(projectName = "default") {
    for (const todos of this.projectManager.getProject(projectName))
      console.log(todos);
  }

  test() {
    this.projectManager.display();
  }
}
