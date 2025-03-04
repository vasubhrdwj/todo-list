export default class taskManager {
  constructor() {
    this.projects = { default: [] };
  }

  addTask(title, dueDate, priority, projectName = "default") {
    let isComplete = false;
    if (!this.projects[projectName]) {
      this.projects[projectName] = [];
    }
    this.projects[projectName].push({ title, dueDate, priority, isComplete });
  }

  getTask(projectName = "default") {
    for (const todos of this.projects[projectName]) console.log(todos);
  }
}
