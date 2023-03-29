import { INITIAL_STATE } from "./game.initialState";

export const gameReducer = (state = INITIAL_STATE, action) => {
  const check = {
    SET_TIME: {
      ...state,
      turnTime: action.payload,
    },
    SET_LIFEPRICE: {
      ...state,
      lifePrice: action.payload,
    },
    ACCUMULATED_POT: {
      ...state,
      potReward: state.potReward + action.payload,
    },
    NEXT_MATCH: {
      ...state,
      matchId: state.matchId + 1,
    },
    GAMEOVER: {
      ...state,
      isGameOver: true,
    },
    SCORES_LOG: {
      ...state,
      scoresLog: [...state.scoresLog, action.payload],
    },
    CLEAN_LOG: {
      ...state,
      scoresLog: [],
    },
    PLAYERS_WINNING: {
      ...state,
      playersWinning: [ ...state.playersWinning, action.payload],
    },
    CLEAN_WINNERS: {
      ...state,
      playersWinning: [],
    },
  };

  return check[action.type] || { ...state };
};
