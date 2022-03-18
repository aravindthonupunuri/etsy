import React, { useState, useEffect } from "react";
import backendServer from "../../webconfig";
import { Card, Container, Col, Row, Alert } from "react-bootstrap";
import Appbar from '../Appbar/Appbar';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const token = sessionStorage.getItem("token");
    let response = await fetch(`${backendServer}/api/user/orders`, {
      method: "GET",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    if (response.ok) {
      let result = await response.json();
      setOrders(result);
      console.log(result);
      console.log(orders);
    }
  };

  let message = null;
  let orderCards = null;

  if (orders.length > 0) {
    orderCards = orders.map((order) => (
      <Card style={{ width: "70rem", margin: "2%" }}>
        <Card.Body>
          <Row style={{ fontFamily: "sans-serif", fontSize: "12px" }}>
            <Col align="left">
              <div>ORDER PLACED {order.createdTime}</div>
            </Col>
            <Col>
              <div></div>
            </Col>
            <Col align="right">
              <div>ORDER # {order.id}</div>
            </Col>
          </Row>
          <Row style={{ fontFamily: "sans-serif", fontSize: "14px" }}>
            <Col align="left">
              <img
                className="user-image"
                style={{ width: "200px", height: "200px" }}
                src={order.itemimage}
                alt="alt"
              />
            </Col>
            <Col style={{ marginTop: "90px" }} align="center">
              <b>Itemname:</b> {order.itemname}
            </Col>
            <Col
              style={{ marginTop: "90px" }}
              align="center"
              textAlign="center"
            >
              <b>Shopname:</b> {order.shopname}
            </Col>
            <Col style={{ marginTop: "90px" }} align="center">
              <b>Quantity:</b> {order.quantity}
            </Col>
            <Col style={{ marginTop: "90px" }} align="center">
              <b>Price:</b> {order.price}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ));
  } else {
    message = (
      <Alert variant="warning">
        You do not have any orders made in the past.
      </Alert>
    );
  }
  return (
    <div>
      <Appbar />
      <Container className="justify-content">
        <Row>
          <Col xs={3}>
            <h3 style={{ marginRight: "70px" }}>Your Orders</h3>
          </Col>
        </Row>
        {message}
        {orderCards}
      </Container>
    </div>
  );
}

export default Orders;