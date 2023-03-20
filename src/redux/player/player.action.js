import { store } from '../store';
const { dispatch } = store;

export const setId = (id) => {
  dispatch({
    type: 'SET_ID',
    payload: id
  })
}

export const setAlias = (string) => {
  dispatch({
    type: 'SET_ALIAS',
    payload: string
  })
}

export const setAvatar = (imgUrl) => {
  dispatch({
    type: 'SET_AVATAR',
    payload: imgUrl
  })
}

export const buyLife = () => {
  dispatch({
    type: 'BUY_LIFE'
  })
}

export const toggleTurn = () => {
  dispatch({
    type: 'TOGGLE_TURN'
  })
}

export const toggleAlive = () => {
  dispatch({
    type: 'TOGGLE_ALIVE' 
  })
}