class Game {
  paddle;
  ball;
  bricks;
  points;
  level;
  lives;

  constructor()
  {
    this.init();
  }

  init() {
    this.paddle = new Paddle();
    this.ball = new Ball();
    this.bricks = new Bricks();
    this.points = 0;
    this.level = 1;
    this.lives = 3;
  }

  draw() {
    this.paddle.draw();
    this.paddle.recalculatePosition();
    this.ball.draw();
    this.ball.recalculatePosition();
    this.bricks.draw();
    this.drawPoints();
    this.drawLevel();
    this.drawLives();
  }

  drawPoints() {
    document.getElementById('points').innerHTML = this.points;
  }

  drawLevel() {
    document.getElementById('level').innerHTML = this.level;
  }

  drawLives() {
    document.getElementById('lives').innerHTML = this.lives;
  }

  startMovingPaddleRight() {
    this.paddle.setMovingRight(true);
  }

  startMovingPaddleLeft() {
    this.paddle.setMovingLeft(true);
  }

  stopMovingPaddleRight() {
    this.paddle.setMovingRight(false);
  }

  stopMovingPaddleLeft() {
    this.paddle.setMovingLeft(false);
  }

  checkWin() {
    return this.bricks.getRemainingBricks() <= 0;
  }

  handleWin() {
    this.nextLevel();
    this.ball.incrementSpeed();
    this.showLevelUp();
    this.level += 1;
  }

  showLevelUp() {
    document.getElementById('level-up').classList.add('show');
    setTimeout(() => {
      document.getElementById('level-up').classList.remove('show');
    }, 2500);
  }

  handlePaddleCollission() {
    if (this.ball.hasTouchedPaddle(this.paddle)) {
      this.ball.changeDirection();
    }
  }

  decreaseLives() {
    this.lives -= 1;
  }

  checkGameOver() {
    return this.ball.hasTouchedBottom();
  }

  handleGameOver() {
    this.decreaseLives();
    if (this.lives > 0) {
      this.reset();
    } else {
      this.showGameOver();
      this.init();
    }
  }

  showGameOver() {
    document.getElementById('game-over').classList.add('show');
  }

  incrementPoints() {
    this.points += 10;
  }

  handleBricksCollission() {
    const collisionDetected = this.ball.collisionDetection(this.bricks);
    if (collisionDetected) {
      this.incrementPoints();
    }
  }

  nextLevel() {
    this.paddle.reset();
    this.ball.resetPosition();
    this.bricks.reset();
  }

  reset() {
    this.paddle.reset();
    this.ball.reset();
  }
}
