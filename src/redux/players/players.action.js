import store from '../store';
const { dispatch } = store;

export const addPlayer = (id) => {
  dispatch({
    type: 'ADD_PLAYER',
    payload: id
  })
}

export const removeLastPlayer = () => {
  dispatch({
    type: 'REMOVE_PLAYER'
  })
}

export const setPlayer = (index, player) => {
  
  dispatch({
    type: 'SET_PLAYER',
    index: index,
    payload: player
  })
}
export const setPlayerProperty = (index, property, value) => {
  dispatch({
    type: 'SET_PLAYER_PROPERTY',
    index: index,
    property: property,
    payload: value
  })
}
