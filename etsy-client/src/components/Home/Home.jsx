import { Redirect } from 'react-router-dom';
import React from 'react';
import { useSelector } from "react-redux"
import Appbar from '../Appbar/Appbar';
require("./Home.css")

export default function Home() {
  const checkName = useSelector((state) => state.loginState.name);
  const token = sessionStorage.getItem('token');
  // console.log("hi token   !" + token);
  if (token === null) return <Redirect to="/login" />;
  else 
  return (
    <div>
      <Appbar />
    </div>
  );
}
