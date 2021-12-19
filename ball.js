class Ball {
  x;
  y;
  radius;
  defaultIncrementX = 1;
  defaultIncrementY = -1;
  incrementX;
  incrementY;
  dificulty;

  constructor() {
    this.init();
  }

  init() {
    this.x = canvas.width/2;
    this.y = canvas.height-30;
    this.radius = 5;
    this.incrementX = this.defaultIncrementX;
    this.incrementY = this.defaultIncrementY;
    this.dificulty = 0;
  }

  getPosX() {
    return this.x;
  }

  getPosY() {
    return this.y;
  }

  getLimitTop() {
    return this.y - this.radius;
  }

  getLimitBottom() {
    return this.y + this.radius;
  }

  getLimitLeft() {
    return this.x - this.radius;
  }

  getLimitRight() {
    return this.x + this.radius;
  }

  setIncrementByDificulty() {
    this.incrementX = this.defaultIncrementX + (this.dificulty * 0.2);
    this.incrementY = this.defaultIncrementY - (this.dificulty * 0.2);
  }

  incrementSpeed() {
    this.dificulty++;
    this.setIncrementByDificulty();
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    context.fillStyle = "#ffffff";
    context.fill();
    context.closePath();
  }

  hasTouchedBottom() {
    return (this.getLimitBottom() + this.incrementY >= canvas.height);
  }
  
  hasTouchedPaddle(paddle) {
    return (
      this.getLimitBottom() <= paddle.getPosY() &&
      this.getLimitBottom() + this.incrementY > paddle.getPosY() &&
      this.x >= paddle.getPosStartX() &&
      this.x <= paddle.getPosEndX()
    );
  }

  collisionDetection(bricks) {
    let collisionDetected = false;

    for(let r = 0; r < bricks.getRows() && !collisionDetected; r++) {
      for(let c = 0; c < bricks.getColumns() && !collisionDetected; c++) {
        const bricksPositions = bricks.getBricksPositions();
        const brick = bricksPositions[r][c];
        if (brick) {
          const brickBorderTop = brick.y;
          const brickBorderBottom = brick.y + bricks.getHeight();
          const brickBorderLeft = brick.x;
          const brickBorderRight = brick.x + bricks.getWidth();

          if (
            this.getPosY() > brickBorderTop && this.getPosY() < brickBorderBottom &&
            (
              (this.getLimitRight() + this.incrementX > brickBorderLeft && this.getLimitRight() + this.incrementX < brickBorderRight)
              || 
              (this.getLimitLeft() + this.incrementX < brickBorderRight && this.getLimitLeft() + this.incrementX > brickBorderLeft)
            )
          ) {
            this.incrementX = -this.incrementX;
            collisionDetected = true;
          }

          if (
            this.getPosX() > brickBorderLeft && this.getPosX() < brickBorderRight &&
            (
              (this.getLimitTop() + this.incrementY < brickBorderBottom && this.getLimitTop() + this.incrementY > brickBorderTop)
              || 
              (this.getLimitBottom() + this.incrementY > brickBorderTop && this.getLimitBottom() + this.incrementY < brickBorderBottom)
            )
          ) {
            this.incrementY = -this.incrementY;
            collisionDetected = true;
          }

          // remove from bricks
          if (collisionDetected) {
            delete(bricksPositions[r][c]);
            bricks.setBricksPositions(bricksPositions);
            bricks.decreaseRemainingBricks();
          }
        }
      }
    }

    return collisionDetected;
  }

  changeDirection() {
    this.incrementY = -this.incrementY;
  }

  recalculatePosition() {
    if (
      this.getLimitLeft() + this.incrementX <= 0 ||
      this.getLimitRight() + this.incrementX >= canvas.width
    ){
      this.incrementX = -this.incrementX;
    }
  
    if (this.getLimitTop() + this.incrementY <= 0){
      this.incrementY = -this.incrementY;
    }
  
    this.x += this.incrementX;
    this.y += this.incrementY;
  }

  resetPosition() {
    this.x = canvas.width/2;
    this.y = canvas.height-30;
  }

  reset() {
    this.resetPosition();
    this.setIncrementByDificulty();
  }
}