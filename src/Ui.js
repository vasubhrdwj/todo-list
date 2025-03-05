const ui = (() => {
  const test = () => {
    const mainDisplay = document.querySelector(".main-display");
    mainDisplay.textContent = `Wohoooo, Linked!`;
  };

  return { test };
})();

export default ui;
