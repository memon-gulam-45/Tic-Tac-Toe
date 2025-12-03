let players = document.querySelector(".players");
let startBtn = document.querySelector("#start-btn");

let mainContainer = document.querySelector(".main-container");
let turnIndicator = document.querySelector("#turn-indicator");
let container = document.querySelector("main .container");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnO = true;

//ScoreBoard Var
let scoreBoard = document.querySelector("#scoreboard");
let p1_name = document.querySelector("#p1-name-display");
let p2_name = document.querySelector("#p2-name-display");
let p1_score = document.querySelector("#p1-score");
let p2_score = document.querySelector("#p2-score");
let draw_score = document.querySelector("#draw-score");

let player1, player2;
let storeName = () => {
  player1 = document.querySelector("#player1").value;
  player2 = document.querySelector("#player2").value;
};

function updateTurnIndicator() {
  const name = turnO ? player1 || "Player 1" : player2 || "Player 2";
  const symbol = turnO ? "O" : "X";
  document.getElementById("turn-name").innerText = name;
  document.getElementById("turn-symbol").innerText = symbol;
}

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  mainContainer.classList.remove("hide");
  container.classList.remove("hide");
  resetBtn.classList.remove("hide");
  updateTurnIndicator();
};

players.addEventListener("submit", (e) => {
  e.preventDefault();
  storeName();

  players.classList.add("hide");

  container.classList.remove("hide");
  resetBtn.classList.remove("hide");

  msgContainer.classList.add("hide");
  mainContainer.classList.remove("hide");
  turnIndicator.classList.remove("hide");

  console.log(player1);
  console.log(player2);

  showScoreBoard();
  updateTurnIndicator();
  players.reset();
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("Box Clicked");

    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
    updateTurnIndicator();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
  }
};

const showWinner = (winner) => {
  let winPlayer;
  if (winner === "O") {
    winPlayer = player1;
    p1_score.innerText = Number(p1_score.innerText) + 1;
  } else {
    winPlayer = player2;
    p2_score.innerText = Number(p2_score.innerText) + 1;
  }

  msg.innerHTML = `🎉 Congratulations, ${winPlayer} won!`;
  msg.classList.add("winner-text");

  msgContainer.classList.remove("hide");

  container.classList.add("add");
  resetBtn.classList.add("add");
  mainContainer.classList.add("hide");

  disableBoxes();
};

const showDraw = () => {
  msg.innerText = "😅 It's Draw!";
  draw_score.innerText = Number(draw_score.innerText) + 1;
  msgContainer.classList.remove("hide");

  container.classList.add("add");
  resetBtn.classList.add("add");
  mainContainer.classList.add("hide");

  disableBoxes();
};

const checkWinner = () => {
  for (pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerHTML;
    let pos2Val = boxes[pattern[1]].innerHTML;
    let pos3Val = boxes[pattern[2]].innerHTML;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return;
      }
    }
  }

  let filledBoxes = 0;
  boxes.forEach((box) => {
    if (box.innerText !== "") {
      filledBoxes++;
    }
  });

  if (filledBoxes === 9) {
    showDraw();
  }
};

newGameBtn.addEventListener("click", () => {
  msgContainer.classList.add("hide");
  turnIndicator.classList.add("hide");
  mainContainer.classList.remove("hide");
  players.classList.remove("hide");
  container.classList.add("hide");
  resetBtn.classList.add("hide");
  enableBoxes();
});

resetBtn.addEventListener("click", resetGame);

//ScoreBoard
function showScoreBoard() {
  p1_name.innerText = player1;
  p2_name.innerText = player2;
}
