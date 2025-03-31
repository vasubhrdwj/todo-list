import "./style.css";
import TaskManager from "./TaskManager";
import Ui from "./Ui";

const taskManager = new TaskManager();
const ui = Ui(taskManager);

// Examples
const fun = () => {
  taskManager.addTask("Study", "2025-1-1", "high");
  taskManager.addTask("Work", "03/04/2025", "low");
  taskManager.addTask("Workout", "2/02/2025", "high", "Fitness");
};

const once = localStorage.getItem("once");

if (!once) {
  fun();
  localStorage.setItem("once", "true");
}

ui.updateProjectsDisplay();

ui.showTasks("Default");
