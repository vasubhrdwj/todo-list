import createTodo from "./createTodo";
import displayTasks from "./displayTasks";
import "./style.css";

window.defaultList = [];
window.display = () => {
  displayTasks(defaultList);
};



window.createTask = () => {
  const obj = createTodo();
  defaultList.push(obj);
};
