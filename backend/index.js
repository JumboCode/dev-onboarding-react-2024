/**
 * index.js
 * @author Gabriel Sessions - JumboCode Fall 2024
 * 
 * @description The primary Node.js file to run the backend server
 * for Tic-Tac-Toe.
 */

// Just like in React, you can import external functions/packages using the
// `import` keyword!
import express from "express";
import bodyParser from "body-parser";
import * as fs from 'fs';

// Initializes "routing" with express.js
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Change this variable if you want the server hosted on a different port!
const port = 3000;

// Route to respond with "Hello, World!"
// Head to http://localhost:3000 to invoke this endpoint!
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

/**
 * The `/sum` endpoint returns the sum of two numbers
 * 
 * @example http://localhost:3000/sum?value1=1&value2=2
 * should return 3 (not 12). Why might you end up with 12
 * instead of 3?
 * 
 * @todo Complete the function! Add the inputs together
 * and return the value. 
 */
app.get('/sum', (req, res) => {
  const queryParams = req.query;
  const value1 = queryParams.value1;
  const value2 = queryParams.value2;
  if (!value1 || !value2) {
    return res.status(400).send('Missing Parameter(s)!');
  }

  // Return the sum here instead of the query validation message
  return res.send("Query Params are Valid");
});

app.get('/save-board', (_, res) => {
  res.send("/save-board is only accessible via POST request!")
})

/**
 * This endpoint should return save a text version of a tic tac toe board
 * to the backend file system.
 * 
 * Given a `body` with a tic-tac-toe board as a 2D array, save it as a string
 * and then save it to a .txt file
 * 
 * @todo Add file saving logic!
 */
app.post('/save-board', (req, res) => {
  const body = req.body;
  
  // Check if the input is a 2d array
  if (!body.board || !Array.isArray(body.board) || !Array.isArray(body.board[0])) {
    return res.status(400).send('Bad Request');
  }
  try {
    const boardString = generateBoardString(body.board);
    console.log(boardString);

    // Save it to a file in the backend folder!
    // Hint: check out this tutorial
    // https://www.w3schools.com/nodejs/nodejs_filesystem.asp
    // No need to `require` fs, I've already imported it for you

    return res.status(201).send("OK")
  }
  catch(error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

/**
 * generateBoardString
 * @description Generates a string representation of a tic-tac-toe board
 * @param {Array<Array<string>>} board - A grid of tic tac toe spaces 
 * with characters in each space
 * @returns A text (string) tic-tac-toe board
 * 
 * @example How to call this endpoint in the browser dev console
 * on in your frontend code.
   fetch("http://localhost:3000/save-board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        board: [["", "O", "X"], ["X", "X", ""], ["O", "", "O"]]
      })
    }).then(res => res.text()).then(res => console.log(res))
 */
function generateBoardString(board) {
    let boardString = '';
    const separator = '-'.repeat(board[0].length * 4 - 1); // Dynamically calculate separator based on board size

    for (let i = 0; i < board.length; i++) {
        boardString += board[i].map(cell => cell === '' ? ' ' : cell).join(' | ') + '\n';
        if (i < board.length - 1) {
            boardString += separator + '\n'; // dynamically add separator
        }
    }
    return boardString;
}

/**
 * This endpoint should load the most recently saved 
 * board from your file system and return it as the response.
 */
app.get("/recent-board-txt", (req, res) => {

  return res.send("Add returned text here")
});

/**
 * Make a copy of the previous function that parses the recently saved
 * board and returns the board as a grid (2d array)
 */
app.get("/recent-board", (req, res) => {
  return res.json({
    // Add Board Here!
    board: [["X"]]
  })
})

/**
 * CHALLENGE: Create an endpoint that takes in a tic-tac-toe
 * board and returns an "AI" move. Integrate this into the tic-tac-toe
 * frontend such that after a player makes a move, it generates an AI move on
 * the backend and displays the move on the frontend.
 */

// Start the server and listen at the specified port number
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
