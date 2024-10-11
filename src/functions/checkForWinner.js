/**
 * checkForWinner.js
 * 
 * @author Gabriel Sessions - JumboCode Fall 2024
 * @description Contains the checkForWinner function used to check
 * if a player has won Tic-Tac-Toe in TicTacToe.jsx
 */


/**
 * checkForWinner
 * @todo Complete the rest of this function!
 * 
 * @description Given a Tic-Tac-Toe game board, this function determines if 
 * there is a winner.
 * @param {Array<Array<string|null>>} board - A 2D array of strings or null 
 * values that represent moves on a Tic-Tac-Toe board.
 * @returns {string|null} - "X" if X is a winner, "O" if O is a winner, null
 * if there is no winner
 * @assumption X and O cannot both be winners (ignore invalid cases)
 * 
 * @note This is **NOT** a React component, just a normal JS function
 * @note The `export` and `default` keywords are used to make this function
 * accessible in TicTacToe.jsx
 */
export default function checkForWinner(board) {
  // Check if the board is valid, exit early if it's not
  if (!board) {
    console.error("checkForWinner was not given a valid Tic-Tac-Toe board");
    return null;
  }

  // Checking if a player has any horizontal wins
  for (let row = 0; row < board.length; row++) {
    let firstCell = board[row][0];
    
    // Skip rows with empty first spaces
    if (firstCell === null) {
      continue;
    }
    
    let isWinningRow = true;
    for (let column = 1; column < board[row].length; column++) {
      if (board[row][column] !== firstCell) {
        isWinningRow = false;
        break;
      }
    }

    if (isWinningRow) {
      return firstCell;  // return player found in winning row
    }
  }

  for (let column = 0; column < board.length; column++) {
    let firstCell = board[0][column];

    if (firstCell === null) {
      continue;
    }

    let isWinningColumn = true;
    for (let row = 1; row < board.length; row++) {
      if (board[row][column] !== firstCell) {
        isWinningColumn = false;
        break;
      }
    }

    if (isWinningColumn) {
      return firstCell;  
    }
  }

  let firstDiagonalCell = board[0][0];
  if (firstDiagonalCell !== null) {
    let isWinningDiagonal = true;
    for (let i = 1; i < board.length; i++) {
      if (board[i][i] !== firstDiagonalCell) {
        isWinningDiagonal = false;
        break;
      }
    }

    if (isWinningDiagonal) {
      return firstDiagonalCell;  
    }
  }

  let secondDiagonalCell = board[0][board.length - 1];
  if (secondDiagonalCell !== null) {
    let isWinningDiagonal = true;
    for (let i = 1; i < board.length; i++) {
      if (board[i][board.length - 1 - i] !== secondDiagonalCell) {
        isWinningDiagonal = false;
        break;
      }
    }

    if (isWinningDiagonal) {
      return secondDiagonalCell;  
    }
  }

  // Return null if no winners
  return null;
}