let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let players = { X: "", O: "" };
let aiEnabled = false;

function startGame(ai) {
  const player1 = document.getElementById("player1").value;
  const player2 = document.getElementById("player2").value;

  if (!player1 || (!player2 && !ai)) {
    showModal();
    return;
  }

  players.X = player1;
  players.O = ai ? "AI" : player2;
  aiEnabled = ai;

  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";
  updateStatus();
}

function updateStatus() {
  document.getElementById(
    "status"
  ).innerHTML = `<h2> ${players[currentPlayer]}'s turn (${currentPlayer})! 🕓</h2>`;
}

function makeMove(cell, index) {
  if (board[index] !== "" || checkWinner()) {
    return;
  }

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;

  if (checkWinner()) {
    document.getElementById(
      "status"
    ).innerHTML = `<h2>${players[currentPlayer]} wins! 🎉</h2>`;
    document.getElementById("returnButton").style.display = "block";
    displayWinningModel();
    return;
  }

  if (board.every((cell) => cell !== "")) {
    document.getElementById("status").innerText = "It's a draw😟";
    document.getElementById("returnButton").style.display = "block";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();

  if (aiEnabled && currentPlayer === "O") {
    aiMove();
  }
}

function aiMove() {
  let emptyCells = board
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null);
  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  setTimeout(() => {
    makeMove(document.querySelectorAll(".cell")[randomIndex], randomIndex);
  }, 500);
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      displayWinningModel();
      return true;
    }
  }
  return false;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerText = ""));
  document.getElementById(
    "status"
  ).innerHTML = `<h2> ${players[currentPlayer]}'s turn 🕓 (${currentPlayer})!</h2>`;
  document.getElementById("returnButton").style.display = "";
  document.getElementById("setup").style.display = "block";
  document.getElementById("game").style.display = "none";

  // Remove the winning model if it exists
  const winningModel = document.querySelector(".winning-model");
  if (winningModel) {
    document.body.removeChild(winningModel);
  }
}

function displayWinningModel() {
  const winningModel = document.createElement("div");
  winningModel.className = "winning-model";
  winningModel.innerHTML = `
        <div>
            <h1>Congratulations🎉 ${players[currentPlayer]}!</h1>
            <p>You won the game!😍</p>
            <button id="returnButton" onclick="resetGame()">Play Again</button>
        </div>        
        `;

  document.body.appendChild(winningModel);

  // Add event listener for Play Again button
  const returnBtn = document.getElementById("return-btn");
  returnBtn.addEventListener("click", () => {
    // Remove the winning model immediately
    document.body.removeChild(winningModel);
    // Reset the game and start again
    resetGame();
    startGame(aiEnabled);
  });
}

function showModal() {
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
