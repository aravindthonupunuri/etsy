import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk'
import rootReducer from "../reducers/index"

const thunkMiddleware = require('redux-thunk').default;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export default store;