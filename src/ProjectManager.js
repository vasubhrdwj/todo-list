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

  delProject(projectName) {
    delete this.projects[projectName];
  }

  getAllProjects() {
    return this.projects;
  }

  setProject(project) {
    this.projects = project;
  }
}
