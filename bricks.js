class Bricks {
  rows;
  columns;
  width;
  height;
  padding;
  offsetTop;
  offsetLeft;
  bricks;
  remainingBricks;

  constructor() {
    this.init();
  }

  init() {
    this.rows = 5;
    this.columns = 5;
    this.width = 70;
    this.height = 5;
    this.paddingX = 20;
    this.paddingY = 13;
    this.offsetTop = 30;
    this.offsetLeft = 35;
    this.remainingBricks = this.rows * this.columns;

    this.bricks = [];
    for(let r = 0; r < this.rows; r++) {
        this.bricks[r] = [];
        for(let c = 0; c < this.columns; c++) {
            this.bricks[r][c] = {
              x: (c * (this.width + this.paddingX)) + this.offsetLeft,
              y: (r * (this.height + this.paddingY)) + this.offsetTop
            };
        }
    }
  }

  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  getRows() {
    return this.rows;
  }
  getColumns() {
    return this.columns;
  }
  getBricksPositions() {
    return this.bricks;
  }
  setBricksPositions(bricks) {
    this.bricks = bricks;
  }
  getRemainingBricks() {
    return this.remainingBricks;
  }
  decreaseRemainingBricks() {
    this.remainingBricks -= 1;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    context.fillStyle = "#ffffff";
    context.fill();
    context.closePath();

    for(let r = 0; r < this.rows; r++) {
      for(let c = 0; c < this.columns; c++) {
        if (this.bricks[r][c]) {
          context.beginPath();
          context.rect(
            this.bricks[r][c].x,
            this.bricks[r][c].y,
            this.width,
            this.height
          );
          context.fillStyle = "#ffffff";
          context.fill();
          context.closePath();
        }
      }
    }
  }
  
  reset() {
    this.init();
  }
}