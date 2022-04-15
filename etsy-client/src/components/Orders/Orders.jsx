import React, { useState, useEffect } from "react";
import backendServer from "../../webconfig";
import { Card, Container, Col, Row, Alert, Form } from "react-bootstrap";
import Appbar from '../Appbar/Appbar';
import Pagination from '../Pagination/Pagination';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(() => {
    getOrders();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentOrders = orders.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

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
    }
  };

  let message = null;
  let orderCards = null;
  console.log("orderes length " + orders.length)
  if (orders.length > 0) {
    orderCards = currentOrders.map((order) => (
      <Card style={{ width: "70rem", margin: "2%" }}>
        <Card.Body>
          <Row style={{ fontSize: "12px" }}>
            <Col align="left">
              <div>Order placed at {order.createdTime}</div>
            </Col>
            <Col>
              <div></div>
            </Col>
            <Col align="right">
              <div>Order id is {order.id}</div>
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
        <h3 style={{ marginRight: "70px" }}>My purchases</h3>
        <Form.Select style={{ width: '300px', marginBottom: '20px' }}
                onChange={(e) => setPostsPerPage(e.target.value)
                }>
                <option value="100">page size</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </Form.Select>
        {message}
        {orderCards}
        <Pagination 
        postsPerPage={postsPerPage}
        totalPosts={orders.length}
        paginate={paginate}
      />
      </Container>
    </div>
  );
}

export default Orders;