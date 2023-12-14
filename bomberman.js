document.addEventListener("DOMContentLoaded", function () {
  createGameBoard();
  generatePlayer1();
  moveLeft();
  moveRight();
  moveUp();
});

const gameContainer = document.querySelector(".game-container");
const rowLabels = ["A", "B", "C", "D", "E", "F", "G"];
const colLabels = ["1", "2", "3", "4", "5", "6", "7"];
let playerRow = rowLabels[Math.floor(Math.random() * rowLabels.length)];
let playerCol = colLabels[Math.floor(Math.random() * colLabels.length)];
let playerXY = `${playerRow}${playerCol}`;

function createGameBoard() {
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 7; col++) {
      const gridSquare = document.createElement("div");
      gridSquare.classList.add("grid-square");
      gridSquare.classList.add(`${rowLabels[row]}${colLabels[col]}`);
      gameContainer.appendChild(gridSquare);
    }
  }
}

const generatePlayer1 = () => {
  let playerDiv = document.querySelector(`.grid-square.${playerXY}`);

  if (playerDiv) {
    const playerImage = document.createElement("img");
    playerImage.src = "./images/bomberman1.jpeg";
    playerImage.classList.add("player-image");
    playerDiv.appendChild(playerImage);
  } else {
    console.error(`Element with class .grid-square.${playerXY} not found.`);
  }
};
// mouvement part
const moveLeft = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      console.log("ArrowLeft key pressed!");

      // Check if moving left is within the game board boundaries
      if (playerCol > 1) {
        let playerDiv = document.querySelector(`.grid-square.${playerXY}`);
        playerDiv.innerHTML = "";

        playerCol--; // Update the player's column position

        let leftXY = `${playerRow}${playerCol}`;
        let leftDiv = document.querySelector(`.grid-square.${leftXY}`);

        if (leftDiv) {
          const playerImage = document.createElement("img");
          playerImage.src = "./images/bomberman1.jpeg";
          playerImage.classList.add("player-image");
          leftDiv.appendChild(playerImage);
          playerXY = leftXY;
        } else {
          console.log("We cannot move there");
        }
      } else {
        alert("Cannot move left, at the edge of the board.");
      }
    }
  });
};

const moveRight = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      console.log("ArrowRight key pressed!");

      // Check if moving right is within the game board boundaries
      if (playerCol < 7) {
        let playerDiv = document.querySelector(`.grid-square.${playerXY}`);
        playerDiv.innerHTML = "";

        playerCol++;

        let RightXY = `${playerRow}${playerCol}`;
        let RightDiv = document.querySelector(`.grid-square.${RightXY}`);

        if (RightDiv) {
          const playerImage = document.createElement("img");
          playerImage.src = "./images/bomberman1.jpeg";
          playerImage.classList.add("player-image");
          RightDiv.appendChild(playerImage);
          playerXY = RightXY;
        } else {
          console.log("We cannot move there");
        }
      } else {
        alert("Cannot move right, at the edge of the board.");
      }
    }
  });
};

const moveUp = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      console.log("ArrowUp key pressed!");

      // Check if moving up is within the game board boundaries
      if (playerRow !== rowLabels[0]) {
        let playerDiv = document.querySelector(`.grid-square.${playerXY}`);
        playerDiv.innerHTML = "";
        let currentRowIndex = rowLabels.indexOf(playerRow);
        let newRowIndex = Math.max(currentRowIndex - 1, 0);
        playerRow = rowLabels[newRowIndex];
        let UpXY = `${playerRow}${playerCol}`;
        let UpDiv = document.querySelector(`.grid-square.${UpXY}`);

        if (UpDiv) {
          const playerImage = document.createElement("img");
          playerImage.src = "./images/bomberman1.jpeg";
          playerImage.classList.add("player-image");
          UpDiv.appendChild(playerImage);
          playerXY = UpXY;
        } else {
          console.log("We cannot move there");
        }
      } else {
        alert("Cannot move UP, at the edge of the board.");
      }
    }
  });
};
