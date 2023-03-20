import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({

})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;