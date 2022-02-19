import { Redirect } from 'react-router-dom';
import Logout from '../Logout/Logout';
import Cookies from 'js-cookie';
import logo from '../../images/logo.png'
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';

function Home() {
  const isLoggedIn = Cookies.get('token');
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <img width='100px' src={logo} alt="Logo" />
          </Col>
          <Col>
            {
              isLoggedIn === undefined ? <Redirect to="/login" /> : null
            }
          </Col>
          <Col>
            <Logout />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home
