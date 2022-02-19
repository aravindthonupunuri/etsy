import Cookies from 'js-cookie';
import { Container, Row, Form, Col, Button, InputGroup, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import backendServer from '../../webconfig';
import { useDispatch } from "react-redux";
import { login } from "../../features/userReducer";
import React, {useState} from 'react';
import { useHistory } from "react-router";

require('./Login.css');

const Login = () => {
  const history = useHistory();
    const [{name, password, signin}, setState] = useState(
    {name: '',
    password: '',
    signin: false}
    )

    const goSignup = () => {
      console.log('in go signup');
      history.replace("/signup");
    };
  
    const checkLogin = (e) => {
      e.preventDefault();
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
          if (res[0].password == password) {        
            Cookies.set('token', 'true');
            console.log("cookies are set");
            setState(preState => ({...preState, signin: true }))
          }
        }
      )
    }

    return (      
      signin ? <div>
        {console.log("hiii  " + name, password, signin)}
        <Redirect to="/" />
        </div> :
      <div className ='center'>
        {console.log(name, password, signin)}
        <Container>
          <Form onSubmit={checkLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control className='inputDim' type="name" placeholder="Enter name" onChange={(e) => setState(preState => ({...preState, name: e.target.value  }))} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control className='inputDim' type="password" placeholder="Password" onChange={(e) => setState(preState => ({...preState, password: e.target.value  }))} />
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
        <Button variant="primary" onClick={goSignup}>Register here</Button>
      </div>
    );
}

export default Login;
