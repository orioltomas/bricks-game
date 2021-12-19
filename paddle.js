class Paddle {
  x;
  y;
  width;
  height;
  incrementX;
  movingRight;
  movingLeft;

  constructor() {
    this.init();
  }

  init() {
    this.height = 3;
    this.width = 70;
    this.x = (canvas.width - this.width)/2;
    this.y = canvas.height-23;
    this.incrementX = 5;
    this.movingRight = false;
    this.movingLeft = false;
  }

  getPosStartX() {
    return this.x;
  }

  getPosEndX() {
    return this.x + this.width;
  }

  getPosY() {
    return this.y;
  }

  setMovingRight(value) {
    this.movingRight = value;
  }

  setMovingLeft(value) {
    this.movingLeft = value;
  }

  draw() {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = "#ffffff";
    context.fill();
    context.closePath();
  }

  recalculatePosition() {
    if (this.movingRight && this.x + this.width + this.incrementX < canvas.width) {
      this.x += this.incrementX;
    }
    else if (this.movingLeft && this.x - this.incrementX > 0) {
      this.x -= this.incrementX;
    }
  }

  reset() {
    this.init();
  }
}