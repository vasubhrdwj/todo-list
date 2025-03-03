export default function displayTasks(list) {
  const mainDisplay = document.querySelector(".main-display");

  list.forEach((element) => {
    mainDisplay.textContent += element.title ;
  });
}
