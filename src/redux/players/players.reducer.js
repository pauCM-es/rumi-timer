import { INITIAL_STATE } from "./players.initialState";

export const playersReducer = ( state = INITIAL_STATE, action ) => {

  const check = {
    ADD_PLAYER: {
      ...state,
      playerList: [ ...state.playerList, { ...state.defaultPlayer, id: action.payload} ]
    },

    REMOVE_PLAYER: {
      ...state,
      playerList: state.playerList.filter(player => player.id !== state.playerList.length)
    },

    SET_LIST: {
      ...state,
      playerList: action.payload
    },

    SET_PLAYER: {
      ...state,
      playerList: [ ...state.playerList.filter(player => player.id !== action.index), action.payload ]
    },

    SET_PLAYER_PROPERTY: {
      ...state,
      playerList: [ 
        ...state.playerList.filter(player => player.id !== action.index),
        { 
          ...state.playerList.find(player => player.id === action.index),
          [action.property]: action.payload
        } 
      ].sort((a, b) => {
        if(a.id < b.id) return -1
      })
    },
  }

  return check[action.type] || { ...state }
}