document.addEventListener("DOMContentLoaded", function () {
  createGameBoard();
});

function createGameBoard() {
  const gameContainer = document.getElementById("game-container");

  const rowLabels = ["A", "B", "C", "D", "E", "F", "G"];
  const colLabels = ["1", "2", "3", "4", "5", "6", "7"];

  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 7; col++) {
      const gridSquare = document.createElement("div");
      gridSquare.classList.add("grid-square");
      gridSquare.classList.add(`${rowLabels[row]}${colLabels[col]}`);
      gameContainer.appendChild(gridSquare);
    }
  }
}