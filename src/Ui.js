export default class ui {
  test() {
    const projectList = document.querySelector(".project-list");
    const li = document.createElement("li");
    li.textContent = "A test really";
    projectList.appendChild(li);
  }
}
