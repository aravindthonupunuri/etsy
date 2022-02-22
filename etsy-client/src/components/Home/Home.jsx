import { Redirect } from 'react-router-dom';
import Logout from '../Logout/Logout';
import logo from '../../images/logo.png'
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import { useSelector } from "react-redux"
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Navbar from '../Appbar/Appbar'
import Appbar from '../Appbar/Appbar';
require("./Home.css")

function Home() {
  const checkName = useSelector((state) => state.loginState.name);
  const token = sessionStorage.getItem('token');
  console.log("hi token   !" + token);
  if (token === null) return <Redirect to="/login" />;
  else 
  return (
    <div>
      <Appbar />
    </div>
  );
}

export default Home
