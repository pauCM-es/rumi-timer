import { INITIAL_STATE } from "./game.initialState";

export const gameReducer = ( state = INITIAL_STATE, action ) => {
  const check = {
    SET_TIME: {
      ...state,
      turnTime: action.payload
    },
    SET_LIFEPRICE: {
      ...state,
      lifePrice: action.payload
    },
    ACCUMULATED_POT: {
      ...state,
      potReward: state.potReward + action.payload
    },
    NEXT_MATCH: {
      ...state,
      matchId: state.matchId++
    },
    GAMEOVER: {
      ...state,
      isGameOver: true
    },
  }

  return check[action.type] || { ...state }
}