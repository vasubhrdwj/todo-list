import "./style.css";
import TaskManager from "./TaskManager";
import Ui from "./Ui";

const taskManager = new TaskManager();
const ui = Ui(taskManager);

// Examples
taskManager.addTask("Study", "03/12/2025", "high");
taskManager.addTask("Work", "03/04/2025", "low");
taskManager.addTask("Workout", "2/02/2025", "high", "Fitness");

ui.updateProjectsDisplay();

ui.showTasks("Default");
const parsedDate = parse("04/03/2002", "dd/MM/yyyy", new Date());
const date = format(parsedDate, "dd MMMM yyyy");
console.log(date);
