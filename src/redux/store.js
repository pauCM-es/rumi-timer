import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { playerReducer } from "./player/player.reducer";
import { gameReducer } from "./game/game.reducer";

const rootReducer = combineReducers({
  game: gameReducer,
  player: playerReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;