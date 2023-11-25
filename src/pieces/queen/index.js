export default class Queen {
  name;
  x;
  y;
  pos;
  image;
  color;
  constructor() {
    this.name = "queen";
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
      this.image = '<div class="piece queen-w"></div>';
    } else if (color === "black") {
      this.image = '<div class="piece queen-b"></div>';
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
    // Check if the move is either a valid move for a Rook or a Bishop
    if (
      !isDiagonalMove(startX, startY, endX, endY) &&
      startX !== endX &&
      startY !== endY
    ) {
      return false;
    }
    // Check if the paths is blocked
    if (isDiagonalMove(startX, startY, endX, endY)) {
      if (!isPathClearDiagonal(board, startX, startY, endX, endY)) {
        return false;
      }
    } else if (!isPathClearHorizental(board, startX, startY, endX, endY)) {
      return false;
    }

    return true;
  }
}

function isPathClearHorizental(board, startX, startY, endX, endY) {
  if (startX === endX) {
    const step = endY > startY ? 1 : -1;
    for (let y = startY + step; y !== endY; y += step) {
      const idx = y * 8 + startX;
      if (board[idx] !== null) {
        return false;
      }
    }
  } else {
    const step = endX > startX ? 1 : -1;
    for (let x = startX + step; x !== endX; x += step) {
      const idx = startY * 8 + x;
      if (board[idx] !== null) {
        return false;
      }
    }
  }

  return true;
}
function isPathClearDiagonal(board, startX, startY, endX, endY) {
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

function isDiagonalMove(startX, startY, endX, endY) {
  const rowDiff = Math.abs(endY - startY);
  const colDiff = Math.abs(endX - startX);

  return rowDiff === colDiff;
}
