import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Appbar from '../Appbar/Appbar';
import { removeFromCart, clearCart } from "../../actions/cartAction";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useHistory } from 'react-router';
import backendServer from '../../webconfig';

require("./Cart.css");

function Cart() {
  const cart = useSelector((state) => state.cartState);
  const currencyState = useSelector((state) => state.currencyState);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const hist = useHistory();

  const removeItem = (item) => {
    dispatch(removeFromCart(item.id));
    totalPrice -= item.price * item.requestedQuantity;
  };

  const placeOrder = async (e) => {
    const token = sessionStorage.getItem("token");
    let response = await fetch(`${backendServer}/api/order`, {
      method: "POST",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ price: totalPrice }),
    });
    if (response.ok) {
      let orderId = await response.text();
      const order = {
        orderId: orderId,
        items: cartItems,
      };
      let addItemsResponse = await fetch(
        `${backendServer}/api/order/addItems`,
        {
          method: "POST",
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(order),
        }
      );
      if (addItemsResponse.ok) {
        hist.push("/mypurchases");
        dispatch(clearCart());
      }
      console.log(orderId);
    }
  };

  const itemsRender = [];
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i += 1) {
    const item = (
      <tr>
        <td style={{ position: "relative" }}>
          <div style={{ paddingTop: "7px" }}>{cartItems[i].name}</div>
        </td>
        <td style={{ position: "relative" }}>
          <div style={{ paddingTop: "7px" }}>
            {currencyState.currency}
            {cartItems[i].price}
          </div>
        </td>
        <td style={{ position: "relative" }}>
          <div style={{ paddingTop: "7px" }}>
            {cartItems[i].requestedQuantity}
          </div>
        </td>
        <td style={{ position: "relative" }}>
          <div style={{ paddingTop: "7px" }}>
            {currencyState.currency}
            {cartItems[i].price * cartItems[i].requestedQuantity}
          </div>
        </td>
        <td align="center">
          <Button variant="light" onClick={() => removeItem(cartItems[i])}>
            Remove
          </Button>
        </td>
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
              <b>
                {currencyState.currency} {totalPrice}
              </b>
            </div>
          </tbody>
        </Table>
        <Button variant="success" onClick={(e) => placeOrder(e)}>
          Place order
        </Button>
      </Container>
    </div>
  );
}

export default Cart;
