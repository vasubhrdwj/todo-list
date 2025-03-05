export default class ProjectManager {
  constructor() {
    this.projects = {
      default: [],
    };
  }

  addProject(projectName) {
    if (!this.projects[projectName]) {
      this.projects[projectName] = [];
    }
  }

  getProject(projectName = "default") {
    if (!this.projects[projectName]) {
      this.addProject(projectName);
    }
    return this.projects[projectName];
  }

  display() {
    console.log(this.projects);
  }
}
