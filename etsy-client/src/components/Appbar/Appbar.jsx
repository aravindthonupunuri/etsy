import {
  Navbar, Nav, FormControl, Form, ListGroupItem, Container, Button,
} from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import logo from '../../images/logo.png'
require('./Appbar.css')

export default function Appbar() {
  const hist = useHistory();
  return (

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img style={{ width: '30%' }} src={logo} alt="Etsy" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <FormControl type="search" placeholder="Search" className="mr-2 barsize" aria-label="Search" />
        <Nav>
          <Nav.Link onClick={() => console.log("hi")} href="#home">Search</Nav.Link>
          <Nav.Link onClick={
            () => hist.replace("/")
          }>Home</Nav.Link>
          <Nav.Link >Favorites</Nav.Link>
          <Nav.Link onClick={
            
            () => {console.log("in shop");hist.replace("/shop")}
          }>Shop</Nav.Link>
          <Nav.Link onClick={
            () => hist.replace("/profile")
          }>Profile</Nav.Link>
          <Nav.Link onClick={
            () => hist.replace("/cart")
          }>Cart</Nav.Link>
          <Nav.Link onClick={
            () => hist.replace("/orders")
          }>Orders</Nav.Link>
          <Nav.Link>
            <FaIcons.FaSignOutAlt />
            <span onClick={() => {
              sessionStorage.clear('token');
              hist.replace("/login");
            }}>Logout</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}