import { store } from "../store";
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
export const nextMatch = ( number ) => {
  dispatch({
    type: 'NEXT_MATCH',
    payload: number
  })
}
export const gameOver = () => {
  dispatch({
    type: 'GAMEOVER'
  })
}