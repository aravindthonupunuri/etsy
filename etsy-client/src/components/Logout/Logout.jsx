import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import React, {useState} from "react";

const Logout = () => {
    const [isLoggedOut, setIsLogOut] = useState(false);
    const removeCookie = () => {        
        Cookies.remove('token');
        console.log("removinig cookies");
        setIsLogOut( prev => !prev)
    }
    if(!isLoggedOut) {
        return (
            <div>
                <button onClick={removeCookie}>
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