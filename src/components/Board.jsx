import React, { useState, useEffect } from "react";
import WINNING_COMBINATIONS from "../winnig-combinations";
import BackDrop from "./BackDrop";

const Board = ({ size, onNewGame }) => {
  const INITIAL_BOARD = new Array(size * size).fill(null);
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const checkingArray = WINNING_COMBINATIONS[size];

  let classes;
  if (size == 3) {
    classes = "grid grid-cols-3 gap-2";
  }
  if (size == 4) {
    classes = "grid grid-cols-4 gap-2";
  }
  if (size == 5) {
    classes = "grid grid-cols-5 gap-2";
  }
  if (size == 6) {
    classes = "grid grid-cols-6 gap-2";
  }
  if (size == 7) {
    classes = "grid grid-cols-7 gap-2";
  }
  if (size == 8) {
    classes = "grid grid-cols-8 gap-2";
  }
  if (size == 9) {
    classes = "grid grid-cols-9 gap-2";
  }
  if (size == 10) {
    classes = "grid grid-cols-10 gap-2";
  }

  const handleClick = (index) => {
    if (winner || board[index]) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const calculateWinner = () => {
      for (let i = 0; i < checkingArray.length; i++) {
        const combination = checkingArray[i];
        const values = combination.map((index) => board[index]);
        if (values.every((val) => val !== null && val === values[0])) {
          setWinner(values[0]);
          return;
        }
      }
    };
    calculateWinner();
  }, [board, checkingArray]);

  const getMessage = () => {
    if (winner) {
      return `Player ${winner} wins!`;
    }
    if (!board.includes(null)) {
      return "It's a Draw!";
    }
    return `Player ${isXNext ? "X" : "O"} turn`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {(winner || !board.includes(null)) && (
        <BackDrop>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl text-red-500 text-center mt-8 mb-5">
              {getMessage()}
            </h2>
            <p className="text-center mb-3">
              Click the button below if you would like to play again.
            </p>
            <button
              onClick={onNewGame}
              className="py-3 w-1/2 bg-blue-500 shadow-xl trtansition active:scale-100 duration-200 hover:scale-x-105 hover:shadow-cyan-500/50 outline-none text-white rounded-lg font-semibold"
            >
              Play Again
            </button>
          </div>
        </BackDrop>
      )}
      <p className="text-xl my-3">{getMessage()}</p>
      <div className={classes}>
        {board.map((value, index) => (
          <button
            onClick={() => handleClick(index)}
            key={index}
            disabled={value !== null}
            className="w-16 h-16 max-md:w-10 max-md:h-10 max-[500px]:h-8 max-[500px]:w-8 max-[400px]:h-6 max-[400px]:w-6 border border-gray-500 flex items-center justify-center text-2xl max-[500px]:text-lg disabled:cursor-not-allowed hover:bg-gray-200 disabled:bg-gray-300 font-bold"
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Board;
