import { Redirect } from 'react-router-dom';
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import loginAction from "../../actions/loginAction"

const Logout = () => {
    const dispatch = useDispatch();
    const [isLoggedOut, setIsLogOut] = useState(false);
    if(!isLoggedOut) {
        return (
            <div>
                <button onClick={() => {
                    setIsLogOut( prev => !prev);
                    dispatch(loginAction("", ""));
                    sessionStorage.clear('token');
                    }}>
                    logout
                </button>
            </div>
        )
    }
    else {
        return <Redirect to = "/login" />
    }
}

export default Logout