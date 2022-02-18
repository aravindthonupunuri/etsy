import Cookies from 'js-cookie';
import { Component } from 'react';
import { Container, Row, Form, Col, Button, InputGroup, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import backendServer from '../../webconfig';

require('./Login.css');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      signin: false
    };
  }

  goSignup = () => {
    console.log('in go signup');
    this.props.history.replace("/signup");
  };

  checkLogin = (e) => {
    e.preventDefault();
    const { name, password } = this.state;
    fetch(`${backendServer}/getUser/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      (res) => res.json()
    ).then(
      (res) => {
        console.log(res[0].password);
        console.log(this.state.password);
        if (res[0].password == this.state.password) {
          // console.log(this.state);          
          Cookies.set('token', 'true');
          console.log("cookies are set");
          this.setState({ signin: true })
        }
      }
    )
  }

  render() {
    const { signin } = this.state;
    if (signin) {
      return <Redirect to="/" />
    }
    return (
      <div class ='center'>
        <Container>
          <Form onSubmit={this.checkLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control className='inputDim' type="name" placeholder="Enter name" onChange={(e) => this.setState({ name: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control className='inputDim' type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
       <Container>
         <Row>
           <Col>
             Are you new user?
           </Col>
         </Row>
       </Container>
        {/* <button onClick={this.goSignup}>
          register here
        </button> */}
        <Button variant="primary" onClick={this.goSignup}>Register here</Button>
      </div>
    );
  }
}

// export default Login;
export default withRouter(Login);
