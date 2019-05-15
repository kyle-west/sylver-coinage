import React from 'react'

export default function GameBoard ({possibleNumbers, makeMove}) {
  return (
    <div className="GameBoard">
      {possibleNumbers && possibleNumbers.map((available, number) => 
        number > 0 ? <button key={number} disabled={!available} onClick={() => makeMove(number)}>{number}</button> : null
      )}
    </div>
  )
}