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
  const currency = useSelector(state => state.currencyState)
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const hist = useHistory();

  const removeItem = (item) => {
    dispatch(removeFromCart(item.id));
    totalPrice -= item.price * item.requestedQuantity;
  };

  const salescount = async (shopname) => {
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

  const preparePayload = async (items) => {
    let payload = [];
    let shops = {};

    for (let index = 0; index < items.length; index++) {
      let item = items[index];
      if (item.shopname in shops) {
        let salesCount = shops[item.shopname];
        shops[item.shopname] = salesCount + item.requestedQuantity;
        var foundIndex = payload.findIndex(
          (shop) => shop.shopname === item.shopname
        );
        payload[foundIndex].salescount = shops[item.shopname];
      } else {
        let salesCount = await salescount(item.shopname);
        shops[item.shopname] = salesCount + item.requestedQuantity;
        let salescountMapping = {
          shopname: item.shopname,
          salescount: shops[item.shopname],
        };
        payload.push(salescountMapping);
      }
    }

    return payload;
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
        let payload = await preparePayload(cartItems);
        await fetch(
          `${backendServer}/api/shop/updatesalescount`,
          {
            method: "PUT",
            headers: {
              "auth-token": token,
              "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({ salesCountMap: payload }),
          }
        );

        hist.push("/mypurchases");
        dispatch(clearCart());
        for (let i = 0; i < cartItems.length; i++) {
          let data = {
            id: cartItems[i].id,
            updated_quantity: cartItems[i].availableQuantity - cartItems[i].requestedQuantity
          }
          await fetch(
            `${backendServer}/api/shop/update/itemQuantity`,
            {
              method: "PUT",
              headers: {
                "auth-token": token,
                "Content-Type": "application/json",
              },
              mode: "cors",
              body: JSON.stringify(data),
            }
          );
        }
      }
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
            {cartItems[i].price} {" "} {currency.currency}
          </div>
        </td>
        <td style={{ position: "relative" }}>
          <div style={{ paddingTop: "7px" }}>
            {cartItems[i].requestedQuantity}
          </div>
        </td>
        <td style={{ position: "relative" }}>
          <div style={{ paddingTop: "7px" }}>            
            {cartItems[i].price * cartItems[i].requestedQuantity} {" "} {currency.currency}
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
            <h1>Welcome to your cart</h1>
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
              <b>Total</b>
              <b>
                 {totalPrice} {" "} {currency.currency}
              </b>
            </div>
          </tbody>
        </Table>
        <div class="col-md-12 text-center">
        <Button style = {{justify: 'center'}} variant="success" onClick={(e) => placeOrder(e)}>
          Place order
        </Button>
        </div>
      </Container>
    </div>
  );
}

export default Cart;
