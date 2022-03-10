import loginReducer from "./loginReducer"
import homeReducer from "./homeReducer";
import signupReducer from "./signupReducer";
import profileReducer from "./profileReducer";
import { combineReducers } from 'redux';

export default combineReducers(
    {
        loginState : loginReducer,
        homeState: homeReducer,
        signupState: signupReducer,
        profileState: profileReducer
    }
)




