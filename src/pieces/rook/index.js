export default class Rook {
  name;
  x;
  y;
  pos;
  image;
  color;
  constructor() {
    this.name = "rook";
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
      this.image = '<div class="piece rook-w"></div>';
    } else if (color === "black") {
      this.image = '<div class="piece rook-b"></div>';
    }
  }
  getValidMoves(board) {
    const validMoves = [];
    const directions = [
      { dx: 1, dy: 0 }, // right
      { dx: -1, dy: 0 }, // left
      { dx: 0, dy: 1 }, // up
      { dx: 0, dy: -1 }, // down
    ];

    for (let i = 0; i < directions.length; ++i) {
      const direction = directions[i];
      let newX = this.x + direction.dx;
      let newY = this.y + direction.dy;

      while (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
        const idx = newY * 8 + newX;
        const targetPiece = board[idx];

        if (targetPiece === null) {
          validMoves.push({ x: newX, y: newY });
        } else {
          validMoves.push({ x: newX, y: newY });
          break; // Obstruction by same color piece
        }

        newX += direction.dx;
        newY += direction.dy;
      }
    }

    return validMoves;
  }
  validMove(startX, startY, endX, endY, board) {
    if (startX !== endX && startY !== endY) {
      return false; // Rook can only move vertically or horizontally
    }

    if (!isPathClear(board, startX, startY, endX, endY)) {
      return false;
    }

    return true;
  }
}

function isPathClear(board, startX, startY, endX, endY) {
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
