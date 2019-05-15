import React from 'react';
import './App.css';
import GameBoard from './components/GameBoard'
import { calculateSumsOfMoves, removeBadOptions } from './components/GameMath'
import GameHistory from './components/GameHistory'

const MAX_NUMBER_AVAILABLE = 500;

const handleMoves = (state, move) => {
  if (!move) return state;
  let {moves, sumsOfMoves, possibleNumbers} = state;

  moves.push(move);
  sumsOfMoves = calculateSumsOfMoves(moves, sumsOfMoves)
  possibleNumbers = removeBadOptions(moves, sumsOfMoves, possibleNumbers)

  return {moves, sumsOfMoves, possibleNumbers}
};

function App() {
  const [{moves, possibleNumbers}, makeMove] = React.useReducer(handleMoves, { 
    moves: [], 
    sumsOfMoves: new Set(), 
    possibleNumbers: new Array(MAX_NUMBER_AVAILABLE+1).fill(true) 
  })

  return (
    <div className="App">
      <h1 className="title">Sylver Coinage Game</h1>

      <blockquote>
        The two players take turns naming positive integers greater than 1 that are not the 
        sum of nonnegative multiples of previously named integers. The player who cannot name 
        such a number loses. For instance, if player A opens with 2, B can win by naming 3. 
        [See the {' '}
        <a href="https://en.wikipedia.org/wiki/Sylver_coinage" target="_blank" rel="noopener noreferrer">Wikipedia article</a>]
      </blockquote>

      <hr/>
      
      <div className="game-container">
        <GameBoard possibleNumbers={possibleNumbers} makeMove={makeMove}/>
        <GameHistory moves={moves} />
      </div>

      <small class="shadow-link">
        <a target="_blank" href="https://github.com/kyle-west/sylver-coinage">
          Created by @kyle-west on GitHub
        </a>
      </small>
    </div>
  );
}

export default App;
