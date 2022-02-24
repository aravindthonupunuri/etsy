import { Redirect } from 'react-router-dom';
import React from 'react';
import { useSelector } from "react-redux"
import Appbar from '../Appbar/Appbar';
import { useState, useEffect } from 'react';
import backendServer from '../../webconfig';
// import { useDispatch } from "react-redux";
import setHomeReduxFromDb from "../../actions/homeAction";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ItemComponent from '../ItemComponent/ItemComponent';
import { Col, Row } from 'react-bootstrap';
require("./Home.css")

export default function Home() {
  let [homeItems, setHomeItems] = useState([]);
  // let dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(dispatch(setHomeReduxFromDb), [])
  useEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      let res = await fetch(`${backendServer}/api/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
      let homeItems = await res.json();
      console.log("items in home" + homeItems.length);
      setHomeItems(homeItems)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  // homeItems = useSelector((state) => {
  //   console.log("in useSelector of home");
  //   return state.homeState.items
  // }
  //   );
  const token = sessionStorage.getItem('token');
  if (token === null) return <Redirect to="/login" />;
  else
    return (
      <div>
        <Appbar />
        <Row>
          {
            homeItems.map(
              homeItem =>
              (<>
                <ItemComponent key={homeItem.id} id={homeItem.id} item={homeItem} />
                <br /><br /><br />
              </>)
            )
          }
        </Row>
      </div >
    );
}
