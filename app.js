const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

document.querySelector('#game-over .retry').addEventListener('click', () => {
  document.getElementById('game-over').classList.remove('show');
})

let requestId = null;
let isPlaying = false;
let game = new Game();

clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

cancelAnimation = () => {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = null;
  }
}

resetApp = () => {
  cancelAnimation();
  isPlaying = false;
}

draw = () => {
  if (game.checkWin()) {
    game.handleWin();
    resetApp();
  }
  if (game.checkGameOver()) {
    game.handleGameOver();
    resetApp();
  }
  game.handlePaddleCollission();
  game.handleBricksCollission();

  clearCanvas();
  game.draw();
  
  if (requestId) {
    requestAnimationFrame(draw);
  }
};

draw();

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    if (!requestId) {
      requestId = window.requestAnimationFrame(draw);
      isPlaying = true;
    } else {
      cancelAnimation();
      isPlaying = false;
    }
  }
  if (e.code === "KeyR") {
    resetApp();
    game = new Game();
    draw();
  }

  if (isPlaying) {
    if(e.code == "ArrowRight") {
      game.stopMovingPaddleRight();
    }
    else if(e.code == "ArrowLeft") {
      game.stopMovingPaddleLeft();
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (isPlaying) {
    if(e.code == "ArrowRight") {
      game.startMovingPaddleRight();
    }
    else if(e.code == "ArrowLeft") {
      game.startMovingPaddleLeft();
    }
  }
});
