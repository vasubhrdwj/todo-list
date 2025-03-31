import { format, parse } from "date-fns";

const ui = (tm) =>
  (() => {
    const mainDisplay = document.querySelector(".main-display");
    const projectList = document.querySelector(".project-list");
    const dialog = document.querySelector("dialog");
    const projectDialog = document.querySelector(".projectDialog");
    const taskForm = document.getElementById("task-form");
    const projectForm = document.getElementById("project-form");
    const titleInput = document.getElementById("title");
    const dueDateInput = document.getElementById("dueDate");
    const priorityInput = document.getElementById("priority");

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
      const addProjectBtn = document.createElement("button");
      addProjectBtn.textContent = "New Project";
      addProjectBtn.classList.add("project-items");
      addProjectBtn.classList.add("addProject-btn");

      projectList.appendChild(addProjectBtn);
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

      const checkBox = createCheckBox(task.id);
      const div1 = document.createElement("div");
      div1.classList.add("div1");

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
      p.style.color = setPriorityColor(task.priority);

      div.appendChild(checkBox);
      div1.appendChild(h4);
      div1.appendChild(p);
      div.append(div1);
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
      const submitBtn = document.querySelector(".submit-btn");

      if (mode === "edit" && task) {
        titleInput.value = task.title;
        submitBtn.innerText = "Edit";

        const parsedDate = parse(task.dueDate, "d MMM yyyy", new Date());
        dueDateInput.value = format(parsedDate, "yyyy-MM-dd");
        priorityInput.value = task.priority;
      } else {
        submitBtn.innerText = "Add";

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
      const submitBtn = document.querySelector(".submit-btn");

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

    const handleProjectSubmit = (event) => {
      event.preventDefault();
      const projectNameInput = document.getElementById("project-name");
      const projectName = projectNameInput.value.trim();
      if (!projectName) {
        alert("Project Name cannot be empty!");
        projectNameInput.focus();
        return;
      }

      tm.addProject(projectName);
      updateProjectsDisplay();
      projectForm.reset();
      projectDialog.close();
    };

    document.addEventListener("click", (event) => {
      const clickedTodo = event.target.closest(".todo");
      const checkboxWrapper = event.target.closest(".checkbox-wrapper-26");

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

        case event.target.classList.contains("project-close-btn"):
          event.preventDefault();
          projectForm.reset();
          projectDialog.close();
          break;

        case event.target.classList.contains("submit-btn"):
          handleSubmit(event);
          break;

        case event.target.classList.contains("project-submit-btn"):
          handleProjectSubmit(event);

          break;

        case event.target.classList.contains("addProject-btn"):
          projectDialog.showModal();
          // tm.addProject(proj);
          updateProjectsDisplay();
          break;

        case event.target.matches(
          ".checkbox-wrapper-26, input[type='checkbox']"
        ):
          event.stopPropagation();
          const todoElement = event.target.closest(".todo");
          if (todoElement) {
            const taskId = Number(todoElement.getAttribute("tid"));
            const projectName = todoElement.getAttribute("pName");
            tm.toggleComplete(projectName, taskId);
          }
          break;

        case !!clickedTodo && !checkboxWrapper:
          const taskId = Number(clickedTodo.getAttribute("tid"));
          const project = clickedTodo.getAttribute("pName");

          const task = tm.getTask(project, taskId);

          openDialog("edit", project, task);
          break;
      }
    });

    window.onload = () => {
      tm.handleRefresh();
      showTasks("Default");
      updateProjectsDisplay();
    };

    const createCheckBox = (taskId) => {
      const c26 = document.createElement("div");
      const checkboxInput = document.createElement("input");
      const checkboxLabel = document.createElement("label");
      const tickMark = document.createElement("div");

      c26.className = "checkbox-wrapper-26";
      checkboxInput.type = "checkbox";
      // Use a unique ID for each checkbox based on taskId
      checkboxInput.id = `checkbox-${taskId}`;
      tickMark.className = "tick_mark";
      checkboxLabel.htmlFor = `checkbox-${taskId}`;

      c26.appendChild(checkboxInput);
      c26.appendChild(checkboxLabel);
      checkboxLabel.appendChild(tickMark);

      return c26;
    };

    const setPriorityColor = (priority) => {
      let color = "white";
      if (priority === "high") {
        color = "#CC6666"; // Dark Red
      }
      if (priority === "medium") {
        color = "#D9B300"; // Dark Yellow
      }
      if (priority === "low") {
        color = "#339966"; // Dark Green
      }

      return color;
    };

    return { updateProjectsDisplay, showTasks };
  })();

export default ui;
