import addProject from "./addProject";
import createTodo from "./createTodo";
import "./style.css";

let defaultList = [];

addProject("Main");


window.createTask = () => {
  const obj = createTodo();
  defaultList.push(obj);
};
