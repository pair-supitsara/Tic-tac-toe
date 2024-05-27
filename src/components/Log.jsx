import { useState } from "react"

export default function Log({ gameTurn }) {
  return (
    <ol id="log">
      {gameTurn.map((item) => 
        <li key={item.square.row +"-"+ item.square.col}>{item.player} selected {item.square.row}, {item.square.col}</li>
      )}
    </ol>
  )
}