const ui = (tm) =>
  (() => {
    const mainDisplay = document.querySelector(".main-display");
    const projectList = document.querySelector(".project-list");
    const dialog = document.querySelector("dialog");
    const taskForm = document.getElementById("task-form");

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

    const showTasks = (projectName) => {
      mainDisplay.innerHTML = "";
      addTaskBtn(projectName);

      const project = tm.Project(projectName);

      for (let tasks of project) {
        const div = createTaskTab(tasks);
        mainDisplay.appendChild(div);
      }
    };

    const createTaskTab = (task) => {
      const h4 = document.createElement("h4");
      h4.textContent = task.title;

      const p = document.createElement("p");
      p.textContent = task.dueDate;

      const div = document.createElement("div");
      div.classList.add("todo");

      const delBtn = document.createElement("btn");
      delBtn.textContent = "DEL";
      delBtn.classList.add("del-btn");
      delBtn.setAttribute("projectname", task.projectName);
      delBtn.setAttribute("tid", task.id);

      div.appendChild(h4);
      div.appendChild(p);
      div.appendChild(delBtn);

      return div;
    };

    const addTaskBtn = (projectName) => {
      const btn = document.createElement("btn");
      btn.textContent = "+ Add Task";
      btn.classList.add("addTask-btn");
      btn.setAttribute("projectName", projectName);

      mainDisplay.appendChild(btn);
    };

    const addNewTask = (projectName) => {
      const titleInput = document.getElementById("title");
      const dueDate = document.getElementById("dueDate").value;
      const priority = document.getElementById("priority").value;

      if (titleInput.value.trim() === "") {
        alert("Title cannot be empty!");
        titleInput.focus();
        return;
      }
      tm.addTask(titleInput.value, dueDate, priority, projectName);
      showTasks(projectName);

      taskForm.reset();
      dialog.close();
    };

    // Handles the btns
    document.addEventListener("click", (event) => {
      switch (event.target.className) {
        case "project-btn":
          showTasks(event.target.name);
          break;

        case "addTask-btn":
          const projectName = event.target.getAttribute("projectname");
          dialog.setAttribute("projectname", projectName);
          dialog.showModal();
          break;

        case "del-btn":
          const pName = event.target.getAttribute("projectname");
          const tid = Number(event.target.getAttribute("tid"));
          tm.deleteTask(pName, tid);
          showTasks(pName);
          break;

        case "close-btn":
          event.preventDefault();
          
          taskForm.reset();
          dialog.close();
          break;

        case "submit-btn":
          event.preventDefault();

          const dialogProject = dialog.getAttribute("projectname");
          addNewTask(dialogProject);

          break;

        default:
          console.info("Unhandled button click:", event.target.className);
      }
    });

    return { updateProjectsDisplay, showTasks };
  })();

export default ui;
