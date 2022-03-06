import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import backendServer from '../../webconfig';
import Appbar from '../Appbar/Appbar';
import ItemComponent from '../ItemComponent/ItemComponent';
import { useHistory } from "react-router";

export default function Cart() {
    const history = useHistory();
    let [cartItems, setCartItems] = useState([]);

    let token = sessionStorage.getItem('token');
    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        async () => {
            let res = await fetch(`${backendServer}/api/cart/items`, {
              method: 'GET',
              headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
              },
              mode: 'cors'
            })
            let cartItems = await res.json();
            console.log(cartItems)
            let items = [];
            for(let i = 0; i < cartItems.length; i++) {
                let it = await fetch(`${backendServer}/api/item/${cartItems[i].itemid}`, {
                    method: 'GET',
                    headers: {
                      'auth-token': token,
                      'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                  })
                  .then(
                      res =>
                      (res.json())
                  )
                  items.push(it);
            }
            console.log(items);
            setCartItems(items)
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []        
    )

    let redirectToMyPurchases = async () => {
      let token = sessionStorage.getItem('token');
      let res = await fetch(`${backendServer}/api/order`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': token
          },
          mode: 'cors'
      })
      res = await res.json()
      let orderid = res.orderid;
console.log(cartItems)
      for(let i = 0; i < cartItems.length; i++) {
        console.log("cart item" + cartItems[i]);
        let orderItem = {
          orderid: orderid,
          itemid: cartItems[i].id,
          shopname: cartItems[i].shopname,
          price: cartItems[i].price,
          quantity: 0
        }
        console.log("order item" + orderItem)
        await fetch(`${backendServer}/api/order/additem`, {
            method: 'POST',
            headers: {
              'auth-token': token,
              'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(orderItem)
          })     
    }

    await fetch(`${backendServer}/api/cart/additem`, {
      method: 'DELETE',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(orderItem)
    }) 
    


      // console.log(res);        
        history.push(`/orders`)
    }

    return <div>
        <Appbar />
        in cart
        <Row>
          {
            cartItems.map(
                cartItem =>
              (
                <Col sm={2} key={cartItem.id}>
                  <React.Fragment>
                    <ItemComponent id={cartItem.id} item={cartItem} />
                    <br /><br /><br />
                  </React.Fragment>
                </Col>
              )
            )
          }
        </Row>
        <Button onClick={redirectToMyPurchases}>
            place order
            </Button>        
    </div>
}