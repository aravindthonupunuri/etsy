import backendServer from '../../webconfig';
import React, { useState } from 'react';
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import loginAction from "../../actions/loginAction";
import userdetailsAction from '../../actions/userdetailsAction';
import logo from "../../images/logo.png";
import { Redirect } from 'react-router-dom';
import favouriteitemsAction from '../../actions/favouriteitemsAction';
require("./Login.css")

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState('');

  const [{ emailId, password, signin }, setState] = useState(
    {
      emailId: "",
      password: "",
      signin: false
    }
  )

  const handleEvent = (event) => {
    setState(preState => ({ ...preState, [event.target.name]: event.target.value }))
  }

  const checkLogin = async (e) => {
    e.preventDefault();
    let res = await fetch(`${backendServer}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({ emailId, password }),
    })
    let token = await res.text();
    if (res.status === 200) {
      dispatch(loginAction(emailId));
      dispatch(userdetailsAction(token));
      dispatch(favouriteitemsAction(token));
      sessionStorage.setItem('token', token);
      history.replace('/');
    }
    else {
      console.log("email is not there");
      setErrorMsg('Please enter valid credentials');
    }
  }

  return (
    signin ? <div>
      <Redirect to="/" />
    </div> :
      <div>
        <div className="container" style={{ width: '25%' }}>
          <div style={{ textAlign: 'center', marginTop: '17%' }}>

            <form onSubmit={checkLogin}>
              <div ><img style={{ width: '85%' }} src={logo} alt="Etsy" /></div>
              <div >
                <div style={{ marginTop: '3%' }}>
                  <h1 style={{ fontSize: 20 }}> Welcome to </h1>
                  <h1 style={{ color: '#FF8C00' }}> Etsy </h1>
                  <h3>Please login</h3>
                </div>
                <div className="form-group" style={{ marginTop: '5%' }}>
                  <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label>Email address : </label></div>
                  <input onChange={handleEvent} name="emailId" value={emailId} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" autoFocus required={true} />
                </div>
                <div className="form-group" style={{ marginTop: '5%' }}>
                  <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label htmlFor="password">Password : </label></div>
                  <input onChange={handleEvent} type="password" name="password" value={password} className="form-control" id="password" aria-describedby="nameHelp" placeholder="Enter Password" autoFocus required={true} />
                </div>
                <div className="text-danger">
                  {errorMsg !== "" ? <h5>{errorMsg}</h5> : null}
                </div>
                <br />
                <button type="submit" className="btn btn-success btn-lg btn-block" style={{ width: "350px" }}>Login</button>
              </div>
              <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}>
                Are you a new use?
                <span>
                  <a href='/signup'>
                    click here to register
                  </a>
                </span>
              </div>

            </form>
          </div>
        </div>
      </div>


  );
}

export default Login;
