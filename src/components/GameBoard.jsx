
export default function GameBoard({ activePlayer, handleClick, gameBoard }) {
    
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {row.map((col, colIndex) => 
                            <li key={colIndex}>
                                <button 
                                    onClick={() => handleClick(rowIndex, colIndex)} 
                                    disabled={col != null}>{col}
                                </button>
                            </li>)
                        }
                    </ol>
                </li>
            )}
        </ol>
    )
}