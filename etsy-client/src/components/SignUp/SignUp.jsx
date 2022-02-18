/* eslint-disable no-debugger */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
/* eslint-disable no-useless-escape */
// import { Button, TextField } from '@mui/material';
// import { Container, Row, Col, } from 'react-bootstrap';
import {
  Container, Row, Form, Col, Button, InputGroup, Alert,
} from 'react-bootstrap';
import React, { Component } from 'react';
import backendServer from '../../webconfig';
import { withRouter } from "react-router-dom";
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
    this.props.history.replace("/login");
  };

  render() {
    const {
      name, emailId, password
    } = this.state;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Container>
          <br />
          <br />
          <Row>
            <Col md={2}>{' '}</Col>
            <Col>
              <div className="heading-content">
                Please Enter Details For Registering
              </div>        
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col md={4}>{' '}</Col>
            <Col md={4} className="login-form-container">
              <br />
              <Form className="login-form mx-auto" noValidate>
                <Form.Group className="mb-2" controlId="formBasicName">
                  <Form.Label>Full Name</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control type="text" placeholder="Enter full name" value={name} onChange={(e) => this.setState({ name: e.target.value })} required />
                    <Form.Control.Feedback type="invalid">
                      Please enter your Full Name.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control type="email" placeholder="Enter email" value={emailId} onChange={(e) => this.setState({ emailId: e.target.value })} required />
                    <Form.Control.Feedback type="invalid">
                      Please enter email adress in proper format.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => this.setState({ password: e.target.value })} required />
                  <Form.Control.Feedback type="invalid">
                    Please enter your password
                  </Form.Control.Feedback>
                </Form.Group>
                
                <div className="d-grid gap-4 ">
                  <Button variant="primary" size="lg" type="submit" onClick={this.handleSubmit}>
                    Register
                  </Button>
                </div>
              </Form>
              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(SignUp);
