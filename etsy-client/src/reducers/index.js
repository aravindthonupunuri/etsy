import loginReducer from "./loginReducer"
import { combineReducers } from 'redux';

export default combineReducers(
    {
        loginState : loginReducer
    }
)




