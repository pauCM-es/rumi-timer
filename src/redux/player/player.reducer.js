import { INITIAL_STATE } from "./player.initialState";

export const playerReducer = ( state = INITIAL_STATE, action ) => {
  const check = {
    SET_ID: {
      ...state,
      id: action.payload        
    },
    SET_ALIAS: {
      ...state,
      alias: action.payload  
    },
    SET_AVATAR: {
      ...state,
      avatar: action.payload  
    },
    BUY_LIFE: {
      ...state,
      life: life++ 
    },
    TOGGLE_TURN: {
      ...state,
      isTurn: !isTurn
    },
    TOGGLE_ALIVE: {
      ...state,
      isAlive: !isAlive 
    }
  }
}