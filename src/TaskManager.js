// TaskManager.js
import ProjectManager from "./ProjectManager";
import { format, isThursday, parse } from "date-fns";

export default class TaskManager {
  constructor() {
    this.pm = new ProjectManager();
    this.taskId = 0;
  }

  addTask(title, dueDate, priority, projectName = "Default") {
    let isComplete = false;
    const projectList = this.Project(projectName);
    const id = this.taskId++;
    dueDate = this.parseDate(dueDate);
    const obj = { id, title, dueDate, priority, isComplete, projectName };
    projectList.push(obj);
    this.setLocalStorage();
  }

  getTask(projectName, id) {
    return this.Project(projectName).find((task) => task.id === id);
  }

  updateTask(projectName, id, { title, dueDate, priority }) {
    const task = this.getTask(projectName, id);
    task.title = title;
    task.dueDate = this.parseDate(dueDate);
    task.priority = priority;
    this.setLocalStorage();
  }

  deleteTask(projectName, id) {
    const projectList = this.Project(projectName);
    this.pm.projects[projectName] = projectList.filter(
      (task) => task.id !== id
    );
    this.setLocalStorage();
  }

  toggleComplete(projectName, id) {
    const task = this.Project(projectName).find((t) => t.id === id);
    task.isComplete = !task.isComplete;
    console.log(this.getAllProjects());
    this.setLocalStorage();
  }

  Project(projectName) {
    return this.pm.getProject(projectName);
  }

  getAllProjects() {
    return this.pm.getAllProjects();
  }

  delProject(projectName) {
    this.pm.delProject(projectName);
    this.setLocalStorage();
  }

  addProject(projectName) {
    this.pm.addProject(projectName);
    this.setLocalStorage();
  }

  parseDate(date) {
    if (!date) return format(new Date(), "d MMM yyyy");
    return format(new Date(date), "d MMM yyyy");
  }

  setLocalStorage() {
    localStorage.setItem("project", JSON.stringify(this.getAllProjects()));
    localStorage.setItem("lastId", JSON.stringify(this.taskId));
  }

  handleRefresh() {
    const ls = localStorage.getItem("project");
    if (!ls) {
      return;
    }
    this.pm.setProject(JSON.parse(ls));
    this.taskId = JSON.parse(localStorage.getItem("lastId"));
  }
}
