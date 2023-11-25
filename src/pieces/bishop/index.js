export default class Bishop {
  name;
  x;
  y;
  pos;
  image;
  color;
  constructor() {
    this.name = "bishop";
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
      this.image = '<div class="piece bishop-w"></div>';
    } else if (color === "black") {
      this.image = '<div class="piece bishop-b"></div>';
    }
  }
  getValidMoves(board) {
    const validMoves = [];

    // Define the four diagonal directions
    const directions = [
      { dx: 1, dy: 1 },
      { dx: 1, dy: -1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
    ];

    for (let i = 0; i < directions.length; ++i) {
      const direction = directions[i];
      let newX = this.x + direction.dx;
      let newY = this.y + direction.dy;

      while (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
        validMoves.push({ x: newX, y: newY });

        // Stop checking in this direction if there's a piece
        if (board[newY * 8 + newX] !== null) {
          newX += direction.dx;
          newY += direction.dy;
          break;
        }

        newX += direction.dx;
        newY += direction.dy;
      }
    }

    return validMoves;
  }
  validMove(startX, startY, endX, endY, board) {
    if (!isDiagonalMove(startX, startY, endX, endY)) {
      return false;
    }

    if (!isPathClear(board, startX, startY, endX, endY)) {
      return false;
    }

    return true;
  }
}

function isDiagonalMove(startX, startY, endX, endY) {
  const rowDiff = Math.abs(endY - startY);
  const colDiff = Math.abs(endX - startX);

  return rowDiff === colDiff;
}

function isPathClear(board, startX, startY, endX, endY) {
  const rowStep = endY > startY ? 1 : -1;
  const colStep = endX > startX ? 1 : -1;
  let currentRow = startY + rowStep;
  let currentCol = startX + colStep;

  while (currentRow !== endY || currentCol !== endX) {
    const idx = currentRow * 8 + currentCol;

    if (board[idx] !== null) {
      return false;
    }

    currentRow += rowStep;
    currentCol += colStep;
  }

  return true;
}
