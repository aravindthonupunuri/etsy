import { Redirect } from 'react-router-dom';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import logoutAction from "../../actions/logoutAction";
import { useHistory } from 'react-router';

const Logout = () => {
    const hist = useHistory();
    const dispatch = useDispatch();
    let logoutHandle = async () => {
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