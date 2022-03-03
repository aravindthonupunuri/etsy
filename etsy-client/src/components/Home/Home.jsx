import { Redirect } from 'react-router-dom';
import React from 'react';
import { useSelector } from "react-redux"
import Appbar from '../Appbar/Appbar';
import { useState, useEffect } from 'react';
import backendServer from '../../webconfig';
// import { useDispatch } from "react-redux";
import setHomeReduxFromDb from "../../actions/homeAction";
import ItemComponent from '../ItemComponent/ItemComponent';
import { Col, Row } from 'react-bootstrap';
require("./Home.css")

export default function Home() {
  let [homeItems, setHomeItems] = useState([]);
  let [filtItems, filteredHomeItems] = useState([]);
  let token = sessionStorage.getItem('token');
  // let dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(dispatch(setHomeReduxFromDb), [])
  useEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      let res = await fetch(`${backendServer}/api/items`, {
        method: 'GET',
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
      let homeItems = await res.json();
      // console.log("items in home" + homeItems.length);
      setHomeItems(homeItems)
      filteredHomeItems(homeItems)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  // homeItems = useSelector((state) => {
  //   console.log("in useSelector of home");
  //   return state.homeState.items
  // }
  //   );
  function filterItems(name) {
    let res = homeItems.filter(
      homeItem => homeItem.itemname.includes(name)
    )
    filteredHomeItems(res)
  }
  if (token === null) return <Redirect to="/login" />;
  else
    return (
      <div>
        <Appbar filterItems={filterItems} />
        <br></br>
        <br></br>
        <br></br>
        <Row>
          {
            filtItems.map(
              homeItem =>
              (
                <Col sm={2} key={homeItem.id}>
                  <React.Fragment>
                    <ItemComponent id={homeItem.id} item={homeItem} />
                    <br /><br /><br />
                  </React.Fragment>
                </Col>
              )
            )
          }
        </Row>
      </div >
    );
}
