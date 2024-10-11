/**
 * TicTacToePage
 * 
 * @author By: Gabriel Sessions - JumboCode Fall 2024
 * @description Renders a page with a TicTacToe game
 */

import TicTacToe from "../components/TicTacToe";
import PageTitle from "../components/PageTitle";

export default function TicTacToePage() {

  /**
   * NOTE: In order to get an updated board,
   * modify these values and refresh your page.
   */
  const boardHeight = 3;
  const boardWidth = 3;

  return(
    <>
      {
        /**
         * This is the second time we're using PageTitle, isn't that handy!
         * Whenever you feel the urge to reuse code, consider making it a
         * component or turning it into a function!
         */
      }
      <PageTitle contents={`${boardWidth}x${boardHeight} Tic-Tac-Toe!`}/>
      <TicTacToe 
        boardWidth={boardWidth} 
        boardHeight={boardHeight} 
      />
    </>
  )
}