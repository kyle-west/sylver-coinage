// =========================================================================
/**
 * @function waysToReturnChange
 * Adapted from https://gist.github.com/Arieg419/cdca8d2b8c17e68de2a6bd2e1a8b664f#file-makechangerecursivefinal-js
 * 
 * @param {Array} denominations 
 * @param {Number} numOfCoins 
 * @param {Number} amount 
 */
function waysToReturnChange(denominations, numOfCoins, amount) {
  if (numOfCoins < 0) return 0;
  if (amount === 0) return 1;
  if (amount < 0) return 0;
  if (numOfCoins < 0 && amount > 0) return 0;
  return (
    waysToReturnChange(denominations, numOfCoins, amount - denominations[numOfCoins]) + 
    waysToReturnChange(denominations, numOfCoins - 1, amount)
  ) 
}
// =========================================================================

function getCoins (moves, sumsOfMoves) {
  let allCoins = [...new Set([...moves, ...sumsOfMoves])].sort((a,b) => a - b);
  let reducedCoins = new Set(allCoins);
  allCoins.forEach((x, i) => {
    allCoins.forEach((y, j) => {
      if (x !== y && x % y === 0) {
        reducedCoins.delete(x)
      }
    })
  })
  return [...reducedCoins];
}

export function calculateSumsOfMoves (moves, sumsOfMoves) {
  moves.forEach(x => moves.forEach(n => {
    if (n !== x) {
      sumsOfMoves.add(x + n)
    }
  }))
  return sumsOfMoves
}

export function removeBadOptions (moves, sumsOfMoves, possibleNumbers) {
  let coins = getCoins(moves, sumsOfMoves) // named after the "Coin Problem"
  return possibleNumbers.map((available, n) => {
    // no need to check an already invalidated option
    if (available !== true) return false;

    return waysToReturnChange(coins, coins.length - 1, n) === 0
  })
}
