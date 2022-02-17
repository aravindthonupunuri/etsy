/* eslint-disable no-debugger */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
/* eslint-disable no-useless-escape */
import React, { Component } from 'react';
import backendServer from '../../webconfig';

require('./SignUp.css');

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email_id: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email_id, password } = this.state;
    console.log(`${name} ${email_id} ${password}`);
    const customer = {
      name: name,
      emailId: email_id,
      password: password,
      address: 'address',
      phone_number: 'phonenumber'
    };
    fetch(`${backendServer}/create/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(customer),
    }).then(
      (res) => { console.log(res); }
    );
    console.log(`${name} ${email_id} ${password}`);
  };

  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          name:
          <input type="text" id="name" onChange={(e) => this.setState({ name: e.target.value })} />
        </label>
        <label>
          email_id:
          <input type="text" id="email_id" onChange={(e) => this.setState({ email_id: e.target.value })} />
        </label>
        <label>
          password:
          <input type="text" id="password" onChange={(e) => this.setState({ password: e.target.value })} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SignUp;
