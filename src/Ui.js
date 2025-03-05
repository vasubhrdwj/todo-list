const ui = (tm) =>
  (() => {
    const updateProjectsDisplay = () => {
      const projects = tm.getAllProjects();
      const projectList = document.querySelector(".project-list");
      for (const project in projects) {
        console.log(project, " : ");
        projects[project].forEach((task) => console.log(task.title));

        const li = document.createElement("li");
        li.textContent = project;

        projectList.appendChild(li);
      }
    };
    return { updateProjectsDisplay };
  })();

export default ui;
