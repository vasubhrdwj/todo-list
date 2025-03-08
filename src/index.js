import "./style.css";
import TaskManager from "./TaskManager";
import Ui from "./Ui";

const taskManager = new TaskManager();
const ui = Ui(taskManager);

// Examples
taskManager.addTask("Study", "2025-12-03", "high");
taskManager.addTask("Work", "2025-04-03", "low");
taskManager.addTask("Workout", "2025-02-01", "high", "Fitness");

// taskManager.changePriority("Default", 0, "medium");
// taskManager.toggleComplete("Default", 1);
ui.updateProjectsDisplay();

ui.showTasks("Default");
