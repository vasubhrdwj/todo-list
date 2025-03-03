import createTodo from "./createTodo";
import "./style.css";

window.defaultList = [];

window.createTask = () => {
  const obj = createTodo();
  defaultList.push(obj);
};
