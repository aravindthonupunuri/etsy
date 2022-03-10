import loginReducer from "./loginReducer"
import homeReducer from "./homeReducer";
import signupReducer from "./signupReducer";

import { combineReducers } from 'redux';

export default combineReducers(
    {
        loginState : loginReducer,
        homeState: homeReducer,
        signupState: signupReducer
    }
)




