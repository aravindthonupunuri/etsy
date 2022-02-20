import { Redirect } from 'react-router-dom';
import Logout from '../Logout/Logout';
import logo from '../../images/logo.png'
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import {useSelector} from "react-redux"
import SearchBar from "material-ui-search-bar";

function Home() {
  const checkName = useSelector(state => state.name);
  if(checkName === "") <Redirect to="/login" />;
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <img width='100px' src={logo} alt="Logo" />
          </Col>
          <SearchBar/>
          <Col>
            <Logout />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home
