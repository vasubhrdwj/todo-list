export default function addProject(name) {
  const projectList = document.querySelector(".project-list");
  const listElement = document.createElement("li");
  listElement.textContent = `# ${name}`;

  projectList.appendChild(listElement);
}
