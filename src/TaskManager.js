// TaskManager.js
import ProjectManager from "./ProjectManager";
import { format, parse } from "date-fns";

export default class TaskManager {
  constructor() {
    this.pm = new ProjectManager();
    this.taskId = 0;
  }

  addTask(title, dueDate, priority, projectName = "Default") {
    let isComplete = false;
    const projectList = this.Project(projectName);
    const id = this.taskId++;
    projectList.push({ id, title, dueDate, priority, isComplete, projectName });
  }

  getTask(projectName, id) {
    return this.Project(projectName).find((task) => task.id === id);
  }

  updateTask(projectName, id, { title, dueDate, priority }) {
    const task = this.Project(projectName).find((task) => task.id === id);
    task.title = title;
    task.dueDate = dueDate;
    task.priority = priority;
  }

  deleteTask(projectName, id) {
    const projectList = this.Project(projectName);
    this.pm.projects[projectName] = projectList.filter(
      (task) => task.id !== id
    );
  }

  toggleComplete(projectName, id) {
    const task = this.Project(projectName).find((t) => t.id === id);
    task.isComplete = !task.isComplete;
  }

  Project(projectName) {
    return this.pm.getProject(projectName);
  }

  getAllProjects() {
    return this.pm.getAllProjects();
  }

  delProject(projectName) {
    this.pm.delProject(projectName);
  }

  addProject(projectName) {
    this.pm.addProject(projectName);
  }
}
