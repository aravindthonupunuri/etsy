import React, { useState } from 'react';
import backendServer from '../../webconfig';
import { useHistory } from "react-router";
import logo from "../../images/logo.png"

require('./SignUp.css');


function SignUp() {
  const [loginError, setErrorMsg] = useState("");
  const history = useHistory();
  const [{ name, emailId, password }, setSignupState] = useState({
    name: "",
    emailId: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${name} ${emailId} ${password}`);
    const customer = {
      emailId: emailId,
      name: name,
      password: password
    };
    let res = await fetch(`${backendServer}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(customer),
    })
    if (res.status === 200) {
      history.replace("/login");
    }
    else {
      setErrorMsg("please enter valid credentials for registration")
    }
  };

  const handleEvent = (event) => {
    setSignupState(preState => ({ ...preState, [event.target.name]: event.target.value }))
  }

  return (
    <div className="container" style={{ width: '25%' }}>
      <div style={{ textAlign: 'center', marginTop: '17%' }}>

        <form onSubmit={handleSubmit}>
          <div ><img style={{ width: '85%' }} src={logo} alt="Uber Eats" /></div>
          <div >
            <div style={{ marginTop: '3%' }}>
              <h3>Please register here</h3>
            </div>
            <div className="form-group" style={{ marginTop: '5%' }}>
              <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label>Email address : </label></div>
              <input onChange={handleEvent} name="emailId" value={emailId} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" autoFocus required={true} />
            </div>
            <div className="form-group" style={{ marginTop: '5%' }}>
              <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label htmlFor="name">User name : </label></div>
              <input onChange={handleEvent} name="name" value={name} className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter Name" autoFocus required={true} />
            </div>
            <div className="form-group" style={{ marginTop: '5%' }}>
              <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label htmlFor="password">Password : </label></div>
              <input onChange={handleEvent} type="password" name="password" value={password} className="form-control" id="password" aria-describedby="nameHelp" placeholder="Enter Password" autoFocus required={true} />
            </div>
            <div className="text-danger">
              {loginError !== "" ? <h5>{loginError}!</h5> : null}
            </div>
            <br />
            <button type="submit" className="btn btn-success btn-lg btn-block" style={{ width: "350px" }}>SignUp</button>
          </div>
          <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}>
            Do you already have an account?
            <span>
              <a href='/login'>
                login
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
