const ui = (tm) =>
  (() => {
    const mainDisplay = document.querySelector(".main-display");
    const projectList = document.querySelector(".project-list");

    const updateProjectsDisplay = () => {
      projectList.innerHTML = "";
      const projects = tm.getAllProjects();
      for (const project in projects) {
        const li = document.createElement("li");
        li.classList.add("project-items");

        const btn = document.createElement("button");
        btn.classList.add("project-btn");
        btn.setAttribute("name", project);
        btn.textContent = project;

        li.appendChild(btn);
        projectList.appendChild(li);
      }
    };

    const createTaskTab = (task) => {
      let title = task.title;
      let dueDate = task.dueDate;

      const h4 = document.createElement("h4");
      h4.textContent = title;

      const p = document.createElement("p");
      p.textContent = dueDate;

      const div = document.createElement("div");

      div.appendChild(h4);
      div.appendChild(p);

      return div;
    };

    const showTasks = (projectName) => {
      mainDisplay.innerHTML = "";
      const project = tm.Project(projectName);
      for (let tasks of project) {
        const div = createTaskTab(tasks);
        mainDisplay.appendChild(div);
      }
    };

    projectList.addEventListener("click", (event) => {
      if (event.target.className !== "project-btn") return;

      const projectName = event.target.name;
      showTasks(projectName);
    });

    return { updateProjectsDisplay, showTasks };
  })();

export default ui;
