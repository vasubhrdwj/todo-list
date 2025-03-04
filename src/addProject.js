export default function addProject(name) {
  // Update Ui
  const projectList = document.querySelector(".project-list");
  const listElement = document.createElement("li");
  listElement.textContent = `# ${name}`;

  projectList.appendChild(listElement);

  
}
