export default class ProjectManager {
  constructor() {
    this.projects = {
      Default: [],
    };
  }

  addProject(projectName) {
    if (!this.projects[projectName]) {
      this.projects[projectName] = [];
    }
  }

  getProject(projectName) {
    if (!this.projects[projectName]) {
      this.addProject(projectName);
    }
    return this.projects[projectName];
  }

  getAllProjects() {
    return this.projects;
  }
}
