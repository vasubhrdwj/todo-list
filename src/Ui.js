const ui = (tm) =>
  (() => {
    const updateProjectsDisplay = () => {
      const projects = tm.getAllProjects();
      const projectList = document.querySelector(".project-list");
      for (const project in projects) {
        const li = document.createElement("li");
        li.classList.add("project-items");

        const btn = document.createElement("button");
        btn.classList.add("project-btn");
        btn.textContent = project;
        li.appendChild(btn);

        projectList.appendChild(li);
      }
    };
    return { updateProjectsDisplay };
  })();

export default ui;
