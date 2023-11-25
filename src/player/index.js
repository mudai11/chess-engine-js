export default class Player {
  side;
  takes;
  score;
  turn;
  constructor() {
    this.score = 0;
    this.takes = [];
    this.turn = false;
  }
  setSide(side) {
    this.side = side;
  }
  take(piece) {
    this.takes.push(piece);
    this.calculateScore(piece);
  }
  calculateScore(piece) {
    switch (piece) {
      case "pawn":
        this.score += 1;
        break;
      case "knight":
        this.score += 3;
        break;
      case "bishop":
        this.score += 3;
        break;
      case "rook":
        this.score += 5;
        break;
      case "queen":
        this.score += 9;
        break;
    }
  }
  getScore() {
    return this.score;
  }
  setTurn(isTurn) {
    this.turn = isTurn;
  }
}
