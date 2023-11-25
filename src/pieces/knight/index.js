export default class Knight {
  name;
  x;
  y;
  pos;
  image;
  color;
  constructor() {
    this.name = "knight";
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
      this.image = '<div class="piece knight-w"></div>';
    } else if (color === "black") {
      this.image = '<div class="piece knight-b"></div>';
    }
  }
  getValidMoves() {
    const validMoves = [];
    const moves = [
      { dx: 2, dy: 1 },
      { dx: 1, dy: 2 },
      { dx: -2, dy: 1 },
      { dx: -1, dy: 2 },
      { dx: 2, dy: -1 },
      { dx: 1, dy: -2 },
      { dx: -2, dy: -1 },
      { dx: -1, dy: -2 },
    ];

    for (let i = 0; i < moves.length; ++i) {
      const move = moves[i];
      const newX = this.x + move.dx;
      const newY = this.y + move.dy;

      if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
        validMoves.push({ x: newX, y: newY });
      }
    }

    return validMoves;
  }
  validMove(startX, startY, endX, endY) {
    const xDiff = Math.abs(endX - startX);
    const yDiff = Math.abs(endY - startY);

    // Knight moves in an L-shape: 2 squares in one direction and 1 square perpendicular
    if ((xDiff === 2 && yDiff === 1) || (xDiff === 1 && yDiff === 2)) {
      return true;
    }

    return false;
  }
}
