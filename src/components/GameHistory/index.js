import React from 'react'

export default function GameHistory ({moves}) {
  let player = 2;
  return (
    <div className="GameHistory">
      {moves && moves.map(m => {
        player = player === 1 ? 2:1
        let playerMove = <code>Player {player}: {m}</code>
        let displayWinnerIfThereWasOne = m === 1 ? `Player ${player === 1 ? 2:1} Wins!`: ''
        return (
          <div key={m}>
            <p>{playerMove}</p>
            <h1>{displayWinnerIfThereWasOne}</h1>
          </div>
        )
      })}
    </div>
  )
}