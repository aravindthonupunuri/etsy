import { Navbar, Nav, FormControl, Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
import * as FaIcons from 'react-icons/fa';
import logo from '../../images/logo.png';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Logout from '../Logout/Logout';
require('./Appbar.css')

export default function Appbar(props) {
  const hist = useHistory();
  const [nameToSearch, setNameToSearch] = useState("");
  const handleEvent = (e) => {
    setNameToSearch(e.target.value);
  }

  return (

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <img style={{ width: '30%' }} src={logo} alt="Etsy" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <FormControl onChange={handleEvent} type="search" placeholder="Search" className="mr-2 barsize" aria-label="Search" />
        <Nav>
          <Nav.Link>
            <SearchIcon onClick={() => props.filterItems(nameToSearch)} />
          </Nav.Link>
          <Nav.Link onClick={
            () => hist.replace("/")
          }>Home</Nav.Link>
          <Nav.Link onClick={
            () => hist.replace("/profile")
          }>Favorites</Nav.Link>
          <Nav.Link onClick={
            () => hist.replace("/shop")
          }> Shop </Nav.Link>
          <Nav.Link onClick={
            () => hist.replace("/profile")
          }>Profile</Nav.Link>
          <Nav.Link onClick={
            () => hist.replace("/cart")
          }>Cart</Nav.Link>
          <Nav.Link onClick={
            () => hist.replace("/mypurchases")
          }>Purchases</Nav.Link>
          <Nav.Link>
            <FaIcons.FaSignOutAlt />
            <Logout />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}