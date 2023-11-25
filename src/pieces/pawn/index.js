export default class Pawn {
  name;
  x;
  y;
  pos;
  initialMove;
  image;
  color;
  constructor() {
    this.initialMove = true;
    this.name = "pawn";
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
  setInitialMove(boolean) {
    this.initialMove = boolean;
  }
  setColor(color) {
    this.color = color;
    if (color === "white") {
      this.image = '<div class="piece pawn-w"></div>';
    } else if (color === "black") {
      this.image = '<div class="piece pawn-b"></div>';
    }
  }
  getValidMoves(board, lastMove) {
    const validMoves = [];
    const direction = this.color === "white" ? -1 : 1;

    // Normal move: one step forward
    const idxForwardOne = (this.y + direction) * 8 + this.x;
    const moveForwardOne = { x: this.x, y: this.y + direction };
    if (board[idxForwardOne] === null) validMoves.push(moveForwardOne);

    // Initial double step
    if (this.initialMove) {
      const moveForwardTwo = { x: this.x, y: this.y + direction * 2 };
      if (board[idxForwardOne] === null) validMoves.push(moveForwardTwo);
    }

    // Capturing diagonally
    const idxRightDiag = (this.y + direction) * 8 + (this.x + 1);
    const captureRight = { x: this.x + 1, y: this.y + direction };
    const idxLeftDiag = (this.y + direction) * 8 + (this.x - 1);
    const captureLeft = { x: this.x - 1, y: this.y + direction };
    if (
      board[idxRightDiag] != null &&
      board[idxRightDiag].color != this.color
    ) {
      validMoves.push(captureRight);
    }
    if (board[idxLeftDiag] != null && board[idxLeftDiag].color != this.color) {
      validMoves.push(captureLeft);
    }

    // Capturing en passant
    if (
      lastMove &&
      lastMove.piece.name === "pawn" && // Last moved piece was a pawn
      Math.abs(lastMove.from.y - lastMove.to.y) === 2 && // It moved two squares forward
      lastMove.to.y === this.y // It moved to the same rank as this pawn
    ) {
      if (lastMove.to.x === this.x + 1 && board[idxRightDiag] === null) {
        // Right en passant
        validMoves.push(captureRight);
      } else if (lastMove.to.x === this.x - 1 && board[idxLeftDiag] === null) {
        // Left en passant
        validMoves.push(captureLeft);
      }
    }

    return validMoves;
  }
  validMove(startX, startY, endX, endY, board, lastMove) {
    const direction = this.color === "white" ? -1 : 1;

    // Normal move: one step forward
    if (
      endX === startX &&
      endY === startY + direction &&
      board[endY * 8 + endX] === null
    ) {
      if (this.initialMove) this.setInitialMove(false);

      return true;
    }

    // Initial double step
    if (
      endX === startX &&
      endY === startY + direction * 2 &&
      this.initialMove &&
      board[endY * 8 + endX] === null &&
      board[(endY - direction) * 8 + endX] === null
    ) {
      this.setInitialMove(false);
      return true;
    }

    // Capturing diagonally
    if (
      Math.abs(endX - startX) === 1 &&
      endY === startY + direction &&
      board[endY * 8 + endX] !== null &&
      board[endY * 8 + endX].color !== this.color
    ) {
      if (this.initialMove) this.setInitialMove(false);
      return true;
    }

    // Capturing en passant - Right en passant
    if (
      endX === startX + 1 &&
      endY === startY + direction &&
      lastMove &&
      lastMove.piece.name === "pawn" && // Last moved piece was a pawn
      Math.abs(lastMove.from.y - lastMove.to.y) === 2 && // It moved two squares forward
      lastMove.to.x === this.x + 1 && // It moved to the square to the right of this pawn
      lastMove.to.y === this.y && // It moved to the same rank as this pawn
      board[endY * 8 + endX] === null // The destination square for en passant is empty
    ) {
      return true;
    }

    // Capturing en passant - Left en passant
    if (
      endX === startX - 1 &&
      endY === startY + direction &&
      lastMove &&
      lastMove.piece.name === "pawn" && // Last moved piece was a pawn
      Math.abs(lastMove.from.y - lastMove.to.y) === 2 && // It moved two squares forward
      lastMove.to.x === this.x - 1 && // It moved to the square to the left of this pawn
      lastMove.to.y === this.y && // It moved to the same rank as this pawn
      board[endY * 8 + endX] === null // The destination square for en passant is empty
    ) {
      return true;
    }

    return false;
  }
}
