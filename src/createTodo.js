export default function createTodo() {
  //   Take input of the details
  const title = prompt("Enter Name of the task: ");
  const dueDate = prompt("Enter due date: ");
  const priority = prompt("Enter priority: ");
  const isComplete = false;

  return { title, dueDate, priority , isComplete};
}
