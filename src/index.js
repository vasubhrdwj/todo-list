import addProject from "./addProject";
import createTodo from "./createTodo";
import displayTasks from "./displayTasks";
import "./style.css";

let defaultList = [];

// Add a default project ( Name : Main)
addProject("Main");

// display = () => {
//   displayTasks(defaultList);
// };

window.createTask = () => {
  const obj = createTodo();
  defaultList.push(obj);
};
