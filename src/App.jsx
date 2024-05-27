import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import Log from "./components/Log.jsx"
import GameOVer from "./components/GameOver.jsx"
import{ WINNING_COMBINATIONS } from './script/winning_combination.js'
import { useState } from "react"

const PLAYERS = {
  X: "Player1",
  O: "Player2"
}

const INITIAL_GAMEBOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function App() {
  const [activePlayer, setActivePlayer] = useState("X")
  const [gameTurn, setGameTurn] = useState([])
  const [gameBoard, setGameBoard] = useState(INITIAL_GAMEBOARD)
  const [playerName, setPlayerName] = useState(PLAYERS)
  
  function handleReMatch() {
    setGameTurn([])
    setGameBoard(initialGameBoard)
    setActivePlayer("X")
  }

  function handleClick(row, col) {
      setGameBoard(prevGameBoard => {
          const updatedGameBoard = [...prevGameBoard.map((array) => [...array])] /* duplicate array */
          updatedGameBoard[row][col] = activePlayer
          
          return updatedGameBoard
      })
      
      handleSelectSquare(row, col)
  }

  function handleSelectSquare(row, col) {
    setGameTurn((prevTurn) => {
      const updatedGameTurn = [...prevTurn, { square: { row: row, col: col }, player: activePlayer }]
      return updatedGameTurn
    })
    setActivePlayer((prevActivePlayer) => prevActivePlayer === 'X' ? 'O' : 'X')
  }
  
  function handleNameChange(symbol, newplayername) {
    setPlayerName((prev) => {
      return {
        ...prev,
        [symbol]: newplayername
      }
    })
  }
  
  function deriveWinner(gameBoard, playerName) {
    let winner
    
    for (const position of WINNING_COMBINATIONS) {
      const firstSymbol = gameBoard[position[0].row][position[0].column]
      const secondSymbol = gameBoard[position[1].row][position[1].column]
      const thirdSymbol = gameBoard[position[2].row][position[2].column]
      
      if (firstSymbol && 
          firstSymbol === secondSymbol && 
          secondSymbol === thirdSymbol) 
      {
        winner = playerName[firstSymbol]
      }
    }
  }
  const winner = deriveWinner(gameBoard, playerName)
  const hasDraw = gameTurn.length == 9

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            playername={PLAYERS.X} 
            symbol="X" 
            isActive={activePlayer === 'X'}
            handleNameChange={handleNameChange}
           />
          <Player 
            playername={PLAYERS.O} 
            symbol="O" 
            isActive={activePlayer === 'O'}
            handleNameChange={handleNameChange}
          />
        </ol>
        { (winner || hasDraw) && <GameOVer winner={winner} handleReMatch={handleReMatch} />}
        <GameBoard 
          activePlayer={activePlayer} 
          handleClick={handleClick}
          gameBoard={gameBoard}
        />
      </div>
      <Log gameTurn={gameTurn} />
    </main>
  )
}

export default App
