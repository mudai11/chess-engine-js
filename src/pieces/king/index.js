export default class King {
  name;
  x;
  y;
  pos;
  image;
  color;
  constructor() {
    this.name = "king";
  }
  setX(x) {
    this.x = x;
  }
  setY(y) {
    this.y = y;
  }
  setPos(pos) {
    this.pos = pos;
  }
  setColor(color) {
    this.color = color;
    if (color === "white") {
      this.image = '<div class="piece king-w"></div>';
    } else if (color === "black") {
      this.image = '<div class="piece king-b"></div>';
    }
  }
  getValidMoves(board) {
    const validMoves = [];
    const directions = [
      { dx: 1, dy: 0 }, // right
      { dx: -1, dy: 0 }, // left
      { dx: 0, dy: 1 }, // up
      { dx: 0, dy: -1 }, // down
      { dx: 1, dy: 1 }, // diagonal up-right
      { dx: -1, dy: 1 }, // diagonal up-left
      { dx: 1, dy: -1 }, // diagonal down-right
      { dx: -1, dy: -1 }, // diagonal down-left
    ];

    for (let i = 0; i < directions.length; ++i) {
      const direction = directions[i];
      const newX = this.x + direction.dx;
      const newY = this.y + direction.dy;

      if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
        validMoves.push({ x: newX, y: newY });
      }
    }

    return validMoves;
  }
  validMove(startX, startY, endX, endY) {
    const xDiff = Math.abs(endX - startX);
    const yDiff = Math.abs(endY - startY);

    // Normal move: one step in any direction
    if (
      (xDiff === 1 && yDiff === 0) ||
      (xDiff === 0 && yDiff === 1) ||
      (xDiff === 1 && yDiff === 1)
    ) {
      return true;
    }

    return false;
  }
}
