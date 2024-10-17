/**
 * TicTacToe.jsx
 * 
 * @author Gabriel Sessions - JumboCode Fall 2024
 * @description Displays a page with a game of Tic-Tac Toe
 * @todo Devs need to finish the implementation of the game!
 */

/**
 * You can use other components inside of component definitions!
 */
import { useState } from "react";
import Square from "./Square";
import checkForWinner from "../functions/checkForWinner";

/**
 * generateEmptyBoard
 * 
 * @description Generates a blank Tic-Tac-Toe board
 * @param {number} boardWidth - Width of the board to be generated
 * @param {number} boardHeight - Height of the board to be generated
 * @returns Array<Array<string|null>> A 2D array board 
 * (boardWidth by boardHeight) will null entries
 * 
 * @note This is not a "clean" implementation of this function. I chose
 * to make this a bit more readable, especially for devs coming from C/C++.
 * @todo Make this function a 1-liner if you're in the mood :)
 */
function generateEmptyBoard(boardWidth, boardHeight) {
  const newBoard = []; // Creates a new array (which are ArrayLists in JS)

  for (let i = 0; i < boardWidth; i++) {
    const newRow = []; // Create a new row for each iteration
    for (let j = 0; j < boardHeight; j++) {
      newRow.push(null); // .push adds an entry to the end of an array
    }
    newBoard.push(newRow); // When row is filled, add it too the new board
  }

  return newBoard;
}

export default function TicTacToe({ boardWidth, boardHeight }) {

  // When the page initially loads, get an empty board
  const initialBoard = generateEmptyBoard(boardWidth, boardHeight);
  const [board, setBoard] = useState(initialBoard);

  // Keep track of whose turn it is ("X" or "O")
  // X starts first 
  const [currentTurn, setCurrentTurn] = useState("X");

  // Indicator if there is a winner
  const [winner, setWinner] = useState(null);

  /**
   * resetGame
   * 
   * @todo Function for you TODO!
   * @description Restarts the Tic-Tac-Toe game: clears the board,
   * sets currentTurn to "X" and sets winner to null
   */
  function resetGame() {
    // Clear the Tic-Tac-Toe board 
    // Hint: Use the generateEmptyBoard function!
    setBoard(generateEmptyBoard(boardWidth, boardHeight))

    // Set currentTurn to "X"
    setCurrentTurn("X")

    // Set winner to null
    setWinner(null)
  }

  /**
   * playerMove
   * 
   * @description Makes a move on the Tic-Tac-Toe board by placing
   * a player icon/letter on a square on the board. Players are not
   * allowed to put markers on already marked squares.
   * @param {number} rowIndex - row number (0-indexed) of where to make the move
   * @param {number} columnIndex - column number (0-indexed) of where to make
   * the move
   * @returns Nothing, but it updates the state of the board and switches
   * whose turn it is if the board space selected is null. 
   * 
   * @note If you want to use a state defined in a component for a function,
   * you'll need to define the function inside the component.
   */
  function playerMove(rowIndex, columnIndex) {
    // Don't proceed if the square is not empty
    // or if there's already a winner
    if (board[rowIndex][columnIndex] !== null || winner) {
      return;
    }

    // Add the current player's icon to the empty space
    setBoard((currentBoard) => {
      /**
       * 1. Copy the old board
       * 
       * The `...` syntax is called a spread operator.
       * It "spreads" out (or enumerates) the contents of an array 
       * so that it can be included in a new array declaration.
       */
      const newBoard = [...currentBoard];

      /**
       * 2. Make the modification to the new board
       */
      newBoard[rowIndex][columnIndex] = currentTurn;

      /*
       * 3. Check if anyone won
       */
      const winner = checkForWinner(board);
      if (winner !== null) {
        setWinner(winner);
      }

      /**
       * 4. Return the new value of the board to be stored in 
       * the `board` state
       */
      return newBoard;
    })

    // Once we update the board, swap turns!
    setCurrentTurn((currentTurn) => {
      if (currentTurn === "X") {
        return "O";
      }
      else if (currentTurn === "O") {
        return "X";
      }
      return "Unknown";
    })

  }

  return (
    <>
      <table className="mx-auto my-8 border-4">
        <tbody>
          {
            /**
             * .map for-loops over an array and executes a function for 
             * each entry in the array
             * 
             * In this case, we're using a double map (for-loop) to render
             * all of the square in our tic-tac-toe board.
             */

            // Rendering rows
            board.map((boardRow, boardRowIndex) => {
              // Returning a table row component per boardRow entry
              return (
                <tr className="border-4" key={boardRowIndex}>
                  {
                    // Rendering columns
                    boardRow.map((_, boardColumnIndex) => {
                      // Returning a Square for each boardColumn in each boardRow
                      return (
                        <td
                          key={boardColumnIndex}
                          className="border-4 w-20 h-20"
                        >
                          {
                            /**
                             * Display the contents of the square based on the 
                             * state of the board
                             */
                          }
                          <Square
                            value={board[boardRowIndex][boardColumnIndex]}
                            onClick={
                              () => playerMove(boardRowIndex, boardColumnIndex)
                            }
                          />
                        </td>
                      )
                    }
                    )}
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {/* 
        * If the game does not have a winner, show whose turn it is 
        * If the game has a winner, show who won.
        * For simplicity, you can assume that a tie is a win for both X and O
        * and you can print out "Winner: X/O"
        * 
        * Note about ternaries: Often we write conditional logic as
        * [condition] ? <Do if True> : <Do if False>
        * 
        * It's a more concise way of writing an if-statement
        */
      }

      {
        // Checks if winner is clearly defined (NOT undefined, null, or empty)
        winner ?
          // Renders if winner is clearly defined
          <>
            <p className="text-center text-xl font-semibold">Winner: {winner}</p>
          </>
          :
          // Renders if winner is not clearly defined
          <>
            <p className="text-center text-xl font-semibold">
              Current Turn: {currentTurn}
            </p>
          </>
      }


      {/* 
        Reset Button 
        Gabe TODO: Refactor into a <Button /> component

        Dev TODO: Make the button do something useful!
        Replace this alert with another function...
      */}
      <div className="flex justify-center my-8">
        <button
          className="text-center border p-2 rounded bg-gray-100 
          hover:bg-gray-200"
          onClick={() => resetGame()}
        >
          Reset Game
        </button>
      </div>
    </>
  )
}