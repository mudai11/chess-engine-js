import initPieces from "../methods/initPieces.js";
import Player from "../player/index.js";

export default class Board {
  width = 8;
  height = 8;
  boardState = [];
  validMoves = [];
  lastMove = null;

  constructor() {
    const {
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
    } = initPieces();
    this.boardState = [
      rightBlackRook,
      rightBlackKnight,
      rightBlackBishop,
      blackQueen,
      blackKing,
      leftBlackBishop,
      leftBlackKnight,
      leftBlackRook,
      firstBlackPawn,
      secondBlackPawn,
      thirdBlackPawn,
      fourthBlackPawn,
      fifthBlackPawn,
      sixthBlackPawn,
      seventhBlackPawn,
      eightBlackPawn,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      firstWhitePawn,
      secondWhitePawn,
      thirdWhitePawn,
      fourthWhitePawn,
      fifthWhitePawn,
      sixthWhitePawn,
      seventhWhitePawn,
      eightWhitePawn,
      leftWhiteRook,
      leftWhiteKnight,
      leftWhiteBishop,
      whiteQueen,
      whiteKing,
      rightWhiteBishop,
      rightWhiteKnight,
      rightWhiteRook,
    ];
  }
  injectBoard() {
    const chessboard = document.querySelector("#chess-board");
    for (let i = 0; i < this.boardState.length; ++i) {
      const square = document.createElement("div");
      const piece = this.boardState[i];
      square.classList.add("square");
      piece && piece.setX(i % 8);
      piece && piece.setY(Math.floor(i / 8));
      piece && piece.setPos(i);
      square.setAttribute("x", i % 8);
      square.setAttribute("y", Math.floor(i / 8));
      square.setAttribute("pos", i);
      square.innerHTML = piece ? piece.image : "";
      square.firstChild?.setAttribute("id", piece.name);
      square.firstChild?.setAttribute("color", piece.color);
      square.firstChild?.setAttribute("draggable", true);
      square.firstChild?.setAttribute("x", i % 8);
      square.firstChild?.setAttribute("y", Math.floor(i / 8));
      square.firstChild?.setAttribute("pos", i);
      const row = Math.floor((63 - i) / 8) + 1;
      if (row % 2 === 0) {
        square.classList.add(i % 2 === 0 ? "glasswhite" : "glassblack");
      } else {
        square.classList.add(i % 2 === 0 ? "glassblack" : "glasswhite");
      }
      chessboard.append(square);
    }
  }
  destroy() {
    const chessboard = document.querySelector("#chess-board");
    chessboard.innerHTML = "";
  }
  startGame() {
    let draggedElement;
    let draggedElementPos;
    console.log(this.boardState);
    const player1 = new Player();
    const player2 = new Player();
    if (Math.round(Math.random()) === 1) {
      player1.setSide("white");
      player1.setTurn(true);
      player2.setSide("black");
    } else {
      player1.setSide("black");
      player2.setSide("white");
      player2.setTurn(true);
    }
    const squares = document.querySelectorAll("#chess-board .square");
    for (let i = 0; i < squares.length; ++i) {
      const square = squares[i];
      {
        square.addEventListener("dragstart", (e) => {
          draggedElement = e.target;
          if (!draggedElement.classList.contains("piece")) return;
          draggedElementPos = Number(
            draggedElement.parentNode.getAttribute("pos")
          );

          // Getting all the valid moves of the piece
          this.validMoves = this.boardState[draggedElementPos].getValidMoves(
            this.boardState,
            this.lastMove
          );
          // Highlighting the valid move squares in the DOM
          for (let i = 0; i < this.validMoves.length; ++i) {
            const move = this.validMoves[i];
            const highlightedSquare = document.querySelector(
              `[x="${move.x}"][y="${move.y}"]`
            );
            if (this.boardState[move.y * 8 + move.x] === null) {
              highlightedSquare?.classList.add("highlight-enemy");
            } else {
              if (
                this.boardState[move.y * 8 + move.x].color !==
                this.boardState[draggedElementPos].color
              ) {
                highlightedSquare?.classList.add("highlight-enemy");
              }
            }
          }
        });
        square.addEventListener("dragover", (e) => {
          e.preventDefault();
          if (!draggedElement.classList.contains("piece")) return;
        });
        square.addEventListener("dragend", (e) => {
          // Clear highlights when drag is canceled
          for (let i = 0; i < this.validMoves.length; ++i) {
            const move = this.validMoves[i];
            const highlightedSquare = document.querySelector(
              `[x="${move.x}"][y="${move.y}"]`
            );
            highlightedSquare?.classList.remove("highlight-ally");
            highlightedSquare?.classList.remove("highlight-enemy");
          }
        });
        square.addEventListener("drop", (e) => {
          e.stopPropagation();
          if (!draggedElement.classList.contains("piece")) return;
          if (
            this.boardState[Number(draggedElement.getAttribute("pos"))]
              .color === player1.side &&
            player1.turn === false
          )
            return;
          if (
            this.boardState[Number(draggedElement.getAttribute("pos"))]
              .color === player2.side &&
            player2.turn === false
          )
            return;
          const piece = this.boardState[draggedElementPos];
          const targetX = Number(e.target.getAttribute("x"));
          const targetY = Number(e.target.getAttribute("y"));
          const targetPos = Number(e.target.getAttribute("pos"));

          const valid = piece.validMove(
            piece.x,
            piece.y,
            targetX,
            targetY,
            this.boardState,
            this.lastMove
          );
          if (!valid) return;

          const targetSquare = this.boardState[targetPos];

          if (targetSquare !== null) {
            if (targetSquare.color !== piece.color) {
              if (piece.color === player1.side) {
                player1.take(targetSquare.name);
                console.log("player 1 :", player1.takes);
                console.log("player 1 score :", player1.getScore());
              } else {
                player2.take(targetSquare.name);
                console.log("player 2 :", player2.takes);
                console.log("player 2 score :", player2.getScore());
              }

              // Set the last move
              this.lastMove = {
                piece: piece,
                from: {
                  x: piece.x,
                  y: piece.y,
                },
                to: {
                  x: targetX,
                  y: targetY,
                },
              };

              // Update attributes of the piece that's taking the enemy piece
              piece.setX(targetX);
              piece.setY(targetY);
              piece.setPos(targetPos);

              // Remove the taken piece from the DOM
              const takingSquare = document.querySelector(
                `[pos="${draggedElementPos}"]`
              );
              takingSquare.innerHTML = "";
              targetSquare.piece = null; // Mark the target square as empty

              // Update the corresponding DOM element
              const targetSquareElement = document.querySelector(
                `[pos="${targetPos}"]`
              );
              targetSquareElement.firstChild.remove();
              draggedElement.setAttribute(
                "x",
                targetSquareElement.getAttribute("x")
              );
              draggedElement.setAttribute(
                "y",
                targetSquareElement.getAttribute("y")
              );
              draggedElement.setAttribute(
                "pos",
                targetSquareElement.getAttribute("pos")
              );
              targetSquareElement.append(draggedElement);

              // Update the boardState
              this.boardState[targetPos] = piece;
              this.boardState[draggedElementPos] = null;
            }
          } else {
            // Set the last move
            this.lastMove = {
              piece: piece,
              from: {
                x: piece.x,
                y: piece.y,
              },
              to: {
                x: targetX,
                y: targetY,
              },
            };

            // Move the piece to the new square
            piece.setX(targetX);
            piece.setY(targetY);
            piece.setPos(targetPos);

            // Update the corresponding DOM element
            const takingSquare = document.querySelector(
              `[pos="${draggedElementPos}"]`
            );
            takingSquare.innerHTML = "";

            const targetSquareElement = document.querySelector(
              `[pos="${targetPos}"]`
            );
            targetSquareElement.firstChild?.remove();
            draggedElement.setAttribute(
              "x",
              targetSquareElement.getAttribute("x")
            );
            draggedElement.setAttribute(
              "y",
              targetSquareElement.getAttribute("y")
            );
            draggedElement.setAttribute(
              "pos",
              targetSquareElement.getAttribute("pos")
            );
            targetSquareElement.append(draggedElement);

            // Update the boardState
            this.boardState[targetPos] = piece;
            this.boardState[draggedElementPos] = null;
          }

          // Clear highlights of the previous valid moves
          for (let i = 0; i < this.validMoves.length; ++i) {
            const move = this.validMoves[i];
            const highlightedSquare = document.querySelector(
              `[x="${move.x}"][y="${move.y}"]`
            );
            highlightedSquare?.classList.remove("highlight-ally");
            highlightedSquare?.classList.remove("highlight-enemy");
          }

          // Give the turn to the other player
          if (player1.turn === true) {
            player1.setTurn(false);
            player2.setTurn(true);
          } else {
            player1.setTurn(true);
            player2.setTurn(false);
          }
        });
      }
    }
  }
}
