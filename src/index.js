import "./style.css";
import TaskManager from "./TaskManager";
import Ui from "./Ui";

const taskManager = new TaskManager();
const ui = Ui(taskManager);

taskManager.addTask("Study", "12/03/2025", "high");
taskManager.addTask("Work", "04/03/2025", "low");
taskManager.addTask("Workout", "02/01/2025", "high", "Fitness");

taskManager.changePriority("Default", 0, "medium");
taskManager.toggleComplete("Default", 1);
taskManager.displayTasks();
console.log("________________________");
console.log(taskManager.getTask("Fitness", 0));
console.log("________________________");
ui.updateProjectsDisplay();
