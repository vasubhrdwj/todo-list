export default class taskManager {
  constructor() {
    this.projects = { default: [] };
  }

  addTask(title, dueDate, priority) {
    let isComplete = false;
    this.projects["default"].push({ title, dueDate, priority, isComplete });
  }
}
