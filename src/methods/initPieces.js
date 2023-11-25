import { Pawn, King, Queen, Rook, Bishop, Knight } from "../pieces/index.js";

export default function initPieces() {
  const whiteKing = new King();
  whiteKing.setColor("white");
  const whiteQueen = new Queen();
  whiteQueen.setColor("white");
  const leftWhiteRook = new Rook();
  leftWhiteRook.setColor("white");
  const rightWhiteRook = new Rook();
  rightWhiteRook.setColor("white");
  const leftWhiteKnight = new Knight();
  leftWhiteKnight.setColor("white");
  const rightWhiteKnight = new Knight();
  rightWhiteKnight.setColor("white");
  const leftWhiteBishop = new Bishop();
  leftWhiteBishop.setColor("white");
  const rightWhiteBishop = new Bishop();
  rightWhiteBishop.setColor("white");
  const firstWhitePawn = new Pawn();
  firstWhitePawn.setColor("white");
  const secondWhitePawn = new Pawn();
  secondWhitePawn.setColor("white");
  const thirdWhitePawn = new Pawn();
  thirdWhitePawn.setColor("white");
  const fourthWhitePawn = new Pawn();
  fourthWhitePawn.setColor("white");
  const fifthWhitePawn = new Pawn();
  fifthWhitePawn.setColor("white");
  const sixthWhitePawn = new Pawn();
  sixthWhitePawn.setColor("white");
  const seventhWhitePawn = new Pawn();
  seventhWhitePawn.setColor("white");
  const eightWhitePawn = new Pawn();
  eightWhitePawn.setColor("white");
  const blackKing = new King();
  blackKing.setColor("black");
  const blackQueen = new Queen();
  blackQueen.setColor("black");
  const leftBlackRook = new Rook();
  leftBlackRook.setColor("black");
  const rightBlackRook = new Rook();
  rightBlackRook.setColor("black");
  const leftBlackKnight = new Knight();
  leftBlackKnight.setColor("black");
  const rightBlackKnight = new Knight();
  rightBlackKnight.setColor("black");
  const leftBlackBishop = new Bishop();
  leftBlackBishop.setColor("black");
  const rightBlackBishop = new Bishop();
  rightBlackBishop.setColor("black");
  const firstBlackPawn = new Pawn();
  firstBlackPawn.setColor("black");
  const secondBlackPawn = new Pawn();
  secondBlackPawn.setColor("black");
  const thirdBlackPawn = new Pawn();
  thirdBlackPawn.setColor("black");
  const fourthBlackPawn = new Pawn();
  fourthBlackPawn.setColor("black");
  const fifthBlackPawn = new Pawn();
  fifthBlackPawn.setColor("black");
  const sixthBlackPawn = new Pawn();
  sixthBlackPawn.setColor("black");
  const seventhBlackPawn = new Pawn();
  seventhBlackPawn.setColor("black");
  const eightBlackPawn = new Pawn();
  eightBlackPawn.setColor("black");

  return {
    whiteKing,
    whiteQueen,
    leftWhiteRook,
    rightWhiteRook,
    leftWhiteBishop,
    rightWhiteBishop,
    leftWhiteKnight,
    rightWhiteKnight,
    firstWhitePawn,
    secondWhitePawn,
    thirdWhitePawn,
    fourthWhitePawn,
    fifthWhitePawn,
    sixthWhitePawn,
    seventhWhitePawn,
    eightWhitePawn,
    blackKing,
    blackQueen,
    leftBlackRook,
    rightBlackRook,
    leftBlackBishop,
    rightBlackBishop,
    leftBlackKnight,
    rightBlackKnight,
    firstBlackPawn,
    secondBlackPawn,
    thirdBlackPawn,
    fourthBlackPawn,
    fifthBlackPawn,
    sixthBlackPawn,
    seventhBlackPawn,
    eightBlackPawn,
  };
}
