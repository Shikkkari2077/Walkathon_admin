import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import homeReducer from "./reducers/HomeReducer";

var middleware = [thunk,logger]

const rootRuducer = combineReducers({
    Walkathon:homeReducer
})

const store = createStore(
    rootRuducer,
    applyMiddleware(...middleware)
)

export default store;