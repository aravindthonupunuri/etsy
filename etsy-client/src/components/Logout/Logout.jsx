import { Redirect } from 'react-router-dom';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import logoutAction from "../../actions/logoutAction";
import { useHistory } from 'react-router';

const Logout = () => {
    const hist = useHistory();
    const dispatch = useDispatch();
    let logoutHandle = async () => {
        // debugger;
        console.log("progress")
        dispatch(logoutAction());                  
        sessionStorage.clear('token');
        hist.replace("/login");
    }

    return (
        <div>
            <div onClick={logoutHandle}
            > logout </div>
        </div>
    )
}

export default Logout