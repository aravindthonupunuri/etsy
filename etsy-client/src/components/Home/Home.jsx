import { Redirect } from 'react-router-dom';
import React from 'react';
import Appbar from '../Appbar/Appbar';
import { useState, useEffect } from 'react';
import backendServer from '../../webconfig';
import Footer from '../Footer/Footer';
import ItemComponent from '../ItemComponent/ItemComponent';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

require("./Home.css")

function valuetext(value) {
  return `${value}$`;
}

export default function Home() {
  
  let [homeItems, setHomeItems] = useState([]);
  let [filtItems, filteredHomeItems] = useState([]);
  let token = sessionStorage.getItem('token');
  const [sortType, setSortType] = useState("");

  const [value, setValue] = useState([0, 1000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const types = {
    price: "price",
    quantity: "available_quantity",
    salescount: "salescount",
  };

  useEffect(() => {
    const sortItems = (type) => {
      const sortProperty = types[type];
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
      setHomeItems(homeItems)
      filteredHomeItems(homeItems)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  function filterItems(name) {
    let res = homeItems.filter(
      homeItem => homeItem.itemname.includes(name)
    )
    filteredHomeItems(res)
  }

  function handlePriceRange() {
    let min = value[0];
    let max = value[1];
    let res = [];
    for(let i = 0; i < homeItems.length; i++) {
        if(homeItems[i].price >= min && homeItems[i].price <= max) res.push(homeItems[i]);
    }
    filteredHomeItems(res);
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
                <Box sx={{ width: 300 }}>
                <Slider
                min={0}
                max={1000}
                  getAriaLabel={() => 'Price range'}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
              </Box>
              <Button onClick = {handlePriceRange}>Price Filter</Button>
              
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
        <br></br>
        <Container>
          <Row>
            {
              filtItems.map(
                homeItem =>
                (
                  <Col sm={3} key={homeItem.id}>
                    <>
                      <ItemComponent id={homeItem.id} item={homeItem} />
                      <br /><br /><br />
                    </>
                  </Col>
                )
              )
            }
          </Row>
        </Container>
     <Footer />
      </div >
    );
}
