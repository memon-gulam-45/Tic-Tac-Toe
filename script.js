let players = document.querySelector(".players");
let startBtn = document.querySelector("#start-btn");

let mainContainer = document.querySelector("#main-container");
let container = document.querySelector(".container");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

let player1, player2;
let storeName = () => {
  player1 = document.querySelector("#player1").value;
  player2 = document.querySelector("#player2").value;
};

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
};

players.addEventListener("submit", (e) => {
  e.preventDefault();
  storeName();

  msgContainer.classList.add("hide");
  container.classList.remove("hide");
  resetBtn.classList.remove("hide");
  players.classList.add("hide");

  console.log(player1);
  console.log(player2);

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
  msg.className = "";
  msg.innerHTML = `🎉 Congratulations, ${
    winner === "O" ? player1 : player2
  } won!`;
  msg.classList.add("winner-text");

  msgContainer.classList.remove("hide");
  container.classList.add("hide");
  resetBtn.classList.add("hide");
  mainContainer.classList.add("hide");

  disableBoxes();
};

const showDraw = () => {
  msg.innerText = "😅 It's Draw!";
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
  players.classList.remove("hide");
  container.classList.add("hide");
  resetBtn.classList.add("hide");
  enableBoxes();
});

resetBtn.addEventListener("click", resetGame);
