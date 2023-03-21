export const INITIAL_STATE = {
  playerList: [
    {
      id: 1,
      alias: 'player',
      avatar: './assets/icons/default-user.svg',
      color: '#be185d',
      score: 0,
      lifes: 0,
      isTurn: false,
      isAlive: true
    }
  ],
  defaultPlayer: {
    id: 0,
    alias: 'player',
    avatar: './assets/icons/default-user.svg',
    color: '#94a3b8',
    score: 0,
    lifes: 0,
    isTurn: false,
    isAlive: true
  }
}