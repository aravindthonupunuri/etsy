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

export default function Home() {
  
  let [homeItems, setHomeItems] = useState([]);
  let [filtItems, filteredHomeItems] = useState([]);
  let [checked, setChecked] = useState(false);
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

  const setSalesCount = async (filteredItems) => {
    let shops = {};
    for (let index = 0; index < filteredItems.length; index++) {
      let item = filteredItems[index];
      if (item.shopname in shops) {
        item.salescount = shops[item.shopname];
      } else {
        let salescount = await calculateSalescount(item.shopname);
        shops[item.shopname] = salescount;
        item.salescount = salescount;
      }
    }
  };

  const calculateSalescount = async (shopname) => {
    const token = sessionStorage.getItem("token");
    let response = await fetch(`${backendServer}/api/shop/${shopname}`, {
      method: "GET",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    let result = await response.json();
    let salescount = result[0].salescount;
    return salescount;
  };

  useEffect(() => {
    setSalesCount(filtItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtItems]);

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

  function removeOutOfStock(e) {
    if(!checked) {
      let res = homeItems.filter(
        homeItem => homeItem.available_quantity !== 0
      )
      filteredHomeItems(res)
      setChecked(true)
    }
    else {
      filteredHomeItems(homeItems)
      setChecked(false)
    }
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
                />
              </Box>
              <Button onClick = {handlePriceRange}>Price Filter</Button>
              <br>
              </br>
              <br></br>
              <input type="checkbox" onChange={(e) => removeOutOfStock(e)}>                
              </input>              
              <span>  select only available items</span>
            </Col>
            <Col sm={6}></Col>
            <Col sm={3}>
              <Form.Select data-testid = "sortType" style={{ width: '300px', marginBottom: '20px' }}
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
                  
                  <Col sm={3} key={homeItem._id}>
                    <>
                      <ItemComponent id={homeItem._id} item={homeItem} />
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
