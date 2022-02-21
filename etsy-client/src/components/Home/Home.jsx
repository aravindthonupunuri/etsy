import { Redirect } from 'react-router-dom';
import Logout from '../Logout/Logout';
import logo from '../../images/logo.png'
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import { useSelector } from "react-redux"
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
require("./Home.css")

function Home() {
  const checkName = useSelector((state) => state.loginState.name);
  if (checkName === "") return <Redirect to="/login" />;
  else 
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <img width='100px' src={logo} alt="Logo" />
          </Col>
          <Col>
            <SearchIcon />
          </Col>
          <Col>
            <div onClick={() => { console.log("hi") }}>
              <FavoriteIcon className='favoritee' />
            </div>

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
