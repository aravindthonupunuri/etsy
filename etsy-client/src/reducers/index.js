import loginReducer from "./loginReducer"
import homeReducer from "./homeReducer";
import { combineReducers } from 'redux';

export default combineReducers(
    {
        loginState : loginReducer,
        homeState: homeReducer
    }
)




