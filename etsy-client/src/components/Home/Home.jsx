import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Logout from '../Logout/Logout';
import Cookies from 'js-cookie';
import logo from '../../images/logo.png'
import { Container, Row, Col } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoggedIn: false
    };
  }

  // handleLogin = () => {
  //   this.setState({isLoggedIn: true});
  // }

  render() {
    console.log(this.state)
    const isLoggedIn = Cookies.get('token');
    console.log("check if isLoggedIn" + isLoggedIn);
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <img width='100px' src={logo} alt="Logo" />
            </Col>
            <Col>
              {
                isLoggedIn == undefined ? <Redirect to="/login" /> : null
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
}

export default Home;
