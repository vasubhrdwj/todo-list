import "./style.css";
import TaskManager from "./TaskManager";

const defaultList = [];

const taskManager = new TaskManager();

taskManager.addTask("Study", "12/03/2025", "high");
taskManager.addTask("Work", "04/03/2025", "low");

console.log(taskManager.projects["default"]);
