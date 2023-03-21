import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { playersReducer } from "./players/players.reducer";
import { gameReducer } from "./game/game.reducer";

const rootReducer = combineReducers({
  game: gameReducer,
  players: playersReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;