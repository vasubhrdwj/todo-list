import "./style.css";
import TaskManager from "./TaskManager";

const taskManager = new TaskManager();

taskManager.addTask("Study", "12/03/2025", "high");
taskManager.addTask("Work", "04/03/2025", "low");
taskManager.addTask("Workout", "02/01/2025", "high", "Fitness");

taskManager.getTask();
