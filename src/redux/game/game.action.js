import store from "../store";
const { dispatch } = store;

export const setTime = ( time ) => {
  dispatch({
    type: 'SET_TIME',
    payload: time
  })
}
export const setLifePrice = ( money ) => {
  dispatch({
    type: 'SET_LIFEPRICE',
    payload: money
  })
}
export const accumulatePot = ( money ) => {
  dispatch({
    type: 'ACCUMULATED_POT',
    payload: money
  })
}
export const nextMatch = () => {
  dispatch({
    type: 'NEXT_MATCH'
  })
  dispatch({
    type: 'CLEAN_LOG'
  })
}
export const gameOver = () => {
  dispatch({
    type: 'GAMEOVER'
  })
}
export const playerScoring = (playerId) => {
  dispatch({
    type: 'SCORES_LOG',
    payload: playerId
  })
}
export const setPlayersWinning = (playersId) => {
  dispatch({
    type: 'PLAYERS_WINNING',
    payload: playersId
  })
}
export const cleanWinners = () => {
  dispatch({
    type: 'CLEAN_WINNERS',
  })
}
