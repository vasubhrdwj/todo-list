const ui = (tm) =>
  (() => {
    const mainDisplay = document.querySelector(".main-display");
    const projectList = document.querySelector(".project-list");
    const dialog = document.querySelector("dialog");
    const taskForm = document.getElementById("task-form");
    const titleInput = document.getElementById("title");
    const dueDateInput = document.getElementById("dueDate");
    const priorityInput = document.getElementById("priority");
    const submitBtn = document.querySelector(".submit-btn");

    let editTaskId = null;
    let editProjectName = null;

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
      for (let task of project) {
        const div = createTaskTab(task);
        mainDisplay.appendChild(div);
      }
    };

    const createTaskTab = (task) => {
      const h4 = document.createElement("h4");
      h4.textContent = task.title;

      const checkBox = createCheckBox();

      const p = document.createElement("p");
      p.textContent = task.dueDate;

      const div = document.createElement("div");
      div.classList.add("todo");
      div.setAttribute("tid", task.id);
      div.setAttribute("pName", task.projectName);

      const delBtn = document.createElement("button");
      delBtn.textContent = "DEL";
      delBtn.classList.add("del-btn");
      delBtn.setAttribute("projectname", task.projectName);
      delBtn.setAttribute("tid", task.id);

      div.appendChild(checkBox);
      div.appendChild(h4);
      div.appendChild(p);
      div.appendChild(delBtn);

      return div;
    };

    const addTaskBtn = (projectName) => {
      const btn = document.createElement("button");
      btn.textContent = "+ Add Task";
      btn.classList.add("addTask-btn");
      btn.setAttribute("projectName", projectName);
      mainDisplay.appendChild(btn);
    };

    const openDialog = (mode, projectName, task = null) => {
      dialog.setAttribute("data-mode", mode);
      dialog.setAttribute("projectname", projectName);
      editTaskId = task ? task.id : null;
      editProjectName = projectName;

      if (mode === "edit" && task) {
        titleInput.value = task.title;
        dueDateInput.value = task.dueDate;
        priorityInput.value = task.priority;
      } else {
        taskForm.reset();
      }
      dialog.showModal();
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const mode = dialog.getAttribute("data-mode");
      const projectName = dialog.getAttribute("projectname");
      const title = titleInput.value.trim();
      const dueDate = dueDateInput.value;
      const priority = priorityInput.value;

      if (!title) {
        alert("Title cannot be empty!");
        titleInput.focus();
        return;
      }

      if (mode === "edit" && editTaskId !== null) {
        tm.updateTask(editProjectName, editTaskId, {
          title,
          dueDate,
          priority,
        });
      } else {
        tm.addTask(title, dueDate, priority, projectName);
      }

      showTasks(projectName);
      taskForm.reset();
      dialog.close();
    };

    document.addEventListener("click", (event) => {
      const clickedTodo = event.target.closest(".todo");
      const checkboxWrapper = event.target.closest(".checkbox-wrapper-26");
      const isCheckbox = event.target.matches('input[type="checkbox"]');

      switch (true) {
        case event.target.classList.contains("project-btn"):
          showTasks(event.target.name);
          break;

        case event.target.classList.contains("addTask-btn"):
          openDialog("add", event.target.getAttribute("projectname"));
          break;

        case event.target.classList.contains("del-btn"):
          const pName = event.target.getAttribute("projectname");
          const tid = Number(event.target.getAttribute("tid"));

          editTaskId = null;
          editProjectName = null;

          tm.deleteTask(pName, tid);

          showTasks(pName);
          break;

        case event.target.classList.contains("close-btn"):
          event.preventDefault();
          taskForm.reset();
          dialog.close();
          break;

        case event.target.classList.contains("submit-btn"):
          handleSubmit(event);
          break;

        case !!checkboxWrapper || isCheckbox:
          console.log("Checkbox clicked! Handle it here.");
          tm.toggleComplete("Default", 0);
          break;

        case !!clickedTodo && !checkboxWrapper:
          const taskId = Number(clickedTodo.getAttribute("tid"));
          const project = clickedTodo.getAttribute("pName");

          const task = tm.getTask(project, taskId);
          console.log(task);
          openDialog("edit", project, task);
          break;
      }
    });

    const createCheckBox = () => {
      const c26 = document.createElement("div");
      const checkboxInput = document.createElement("input");
      const checkboxLabel = document.createElement("label");
      const tickMark = document.createElement("div");

      c26.className = "checkbox-wrapper-26";
      checkboxInput.type = "checkbox";
      checkboxInput.id = "_checkbox-26";
      tickMark.className = "tick_mark";
      checkboxLabel.htmlFor = "_checkbox-26";

      c26.appendChild(checkboxInput);
      c26.appendChild(checkboxLabel);
      checkboxLabel.appendChild(tickMark);

      return c26;
    };

    return { updateProjectsDisplay, showTasks };
  })();

export default ui;
