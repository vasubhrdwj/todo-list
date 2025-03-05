// TaskManager.js
import ProjectManager from "./ProjectManager";

export default class TaskManager {
  constructor() {
    this.projectManager = new ProjectManager();
  }

  addTask(title, dueDate, priority, projectName = "default") {
    let isComplete = false;
    const projectList = this.projectManager.getProject(projectName);
    const id = projectList.length;
    projectList.push({ id, title, dueDate, priority, isComplete });
  }

  getTask(projectName = "default") {
    for (const todos of this.projectManager.getProject(projectName))
      console.log(todos);
  }

  changePriority(projectName, id, priority) {
    const currProject = this.projectManager.getProject(projectName);
    currProject[id].priority = priority;
  }

  test() {
    this.projectManager.display();
  }
}
