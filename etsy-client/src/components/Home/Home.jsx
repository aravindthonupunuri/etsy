import { Redirect } from 'react-router-dom';
import React from 'react';
import { useSelector } from "react-redux"
import Appbar from '../Appbar/Appbar';
import { useState, useEffect } from 'react';
import backendServer from '../../webconfig';
// import { useDispatch } from "react-redux";
import setHomeReduxFromDb from "../../actions/homeAction";
import ItemComponent from '../ItemComponent/ItemComponent';
import { Col, Container, Form, Row } from 'react-bootstrap';

require("./Home.css")

export default function Home() {
  let [homeItems, setHomeItems] = useState([]);
  let [filtItems, filteredHomeItems] = useState([]);
  let token = sessionStorage.getItem('token');
  const [sortType, setSortType] = useState("");
  // let dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(dispatch(setHomeReduxFromDb), [])
  const types = {
    price: "price",
    quantity: "available_quantity",
    salescount: "salescount",
  };

  useEffect(() => {
    const sortItems = (type) => {
      const sortProperty = types[type];
      debugger
      const sorted = [...filtItems].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      filteredHomeItems(sorted);
    };

    sortItems(sortType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);


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
        <Container>
          <Row>
            <Col sm={3}>
              {/* <Form.Select style={{ width: '200px', marginBottom: '20px' }}
                className="countryPicker"
                name="country"
                // value={profileDetails.country}
                onChange={(e) => handleFilter(e)}
                aria-label="Default select example"
              >
                <option>Filters</option>
                <option value="pricerange">Price Range</option>
              </Form.Select> */}
              
            </Col>
            <Col sm={6}></Col>
            <Col sm={3}>
              <Form.Select style={{ width: '300px', marginBottom: '20px' }}
                onChange={(e) => setSortType(e.target.value)
                }>
                <option>Sort by</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
                <option value="salescount">Sales count</option>
              </Form.Select>
            </Col>
          </Row>

        </Container>

        <Container>
          {console.log("fitered items ")}
          {console.log(filtItems)}
          <Row>
            {
              filtItems.map(
                homeItem =>
                (
                  <Col sm={3} key={homeItem.id}>
                    <>
                      {console.log(homeItem.price)}
                      <ItemComponent id={homeItem.id} item={homeItem} />
                      <br /><br /><br />
                    </>
                  </Col>
                )
              )
            }
          </Row>
        </Container>

      </div >
    );
}
