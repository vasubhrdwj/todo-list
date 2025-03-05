import "./style.css";
import TaskManager from "./TaskManager";
import ProjectManager from "./ProjectManager";

const taskManager = new TaskManager();

taskManager.addTask("Study", "12/03/2025", "high");
taskManager.addTask("Work", "04/03/2025", "low");
taskManager.addTask("Workout", "02/01/2025", "high", "Fitness");

taskManager.changePriority("default", 0, "medium");

taskManager.getTask();
