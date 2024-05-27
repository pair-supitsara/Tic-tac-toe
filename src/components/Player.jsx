import { useState } from "react"

export default function Player({ playername, symbol, isActive, handleNameChange }) {
  const [name, setName] = useState(playername)  
  const [isEditting, setIsEditting] = useState(false)  

  function fnHandleClick() {
    /* setIsEditting( isEditting ? false : true )*/ /* work well, but complex */
    /* setIsEditting(!isEditting) */ /* not reccomend in react */
    setIsEditting(isEditting => !isEditting) /* reccomend in react */
    handleNameChange(symbol, name)
  }

  function fnHandleChange(event) {
    setName(event.target.value)
  }

  return (
    <>
      <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {!isEditting && <span className="player-name">{ name }</span>}
            {isEditting && <input type="text" required value={ name } onChange={fnHandleChange}/>} 
            <span className="player-synbol">{ symbol }</span>
          </span>
          <button onClick={fnHandleClick}> { !isEditting ? "Edit" : "Save" }</button>
      </li>
    </>
  )
}