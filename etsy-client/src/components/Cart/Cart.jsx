import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Appbar from '../Appbar/Appbar';
import { Container, Row, Col, Table, Button } from "react-bootstrap";

require("./Cart.css");

function Cart() {
  const cart = useSelector((state) => state.cartState);
  const { cartItems } = cart;

  const itemsRender = [];
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i += 1) {
    const item = (
      <tr>
        <td>{cartItems[i].name}</td>
        <td>${cartItems[i].price}</td>
        <td>{cartItems[i].requestedQuantity}</td>
        <td>${cartItems[i].price * cartItems[i].requestedQuantity}</td>
      </tr>
    );
    totalPrice += cartItems[i].price * cartItems[i].requestedQuantity;
    itemsRender.push(item);
  }

  return (
    <div>
      <Appbar />

      <Container>
        <Row>
          <Col>
            <h1>Your Cart</h1>
          </Col>
        </Row>
        <br />
        <Table className="content-table">
          <thead>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </thead>
          <tbody>
            {itemsRender}
            <br />
            <br />
            <br />
            <div style={{ position: "absolute", right: "330px" }}>
              <b>Items Total</b>
              <b>$ {totalPrice}</b>
            </div>
          </tbody>
        </Table>
        <Button
          variant="success"
          // onClick={(e) => this.placeOrder(e)}
        >
          Place order
        </Button>
      </Container>
    </div>
  );
}

export default Cart;
