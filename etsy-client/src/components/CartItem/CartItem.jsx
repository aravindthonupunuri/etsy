import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

function CartItem({cartItem, removeItem, evaluatePrice}) {
    const [counter, setCounter] = useState(cartItem.requestedQuantity);
    const [outOfStock, setOutOfStock] = useState("");
    const currency = useSelector(state => state.currencyState)

    let incrementCounter = (item) => {
      console.log("in cart item")
      console.log(item)
      if (counter <= item.availableQuantity) {
        setCounter(counter + 1);
        if (counter + 1 > item.availableQuantity) setOutOfStock("Out of Stock")        
      }
    }

    let decrementCounter = () => {
      if (counter > 1) {
        setCounter(counter - 1);
        setOutOfStock("");
      }
    }

    if(outOfStock === "") {
        cartItem.requestedQuantity = counter
        evaluatePrice()
    }

    return <>
            <td style={{ position: "relative" }}>
          <div style={{ paddingTop: "7px" }}>{cartItem.name}</div>
        </td>
        <td style={{ position: "relative" }}>
          <div style={{ paddingTop: "7px" }}>
            {cartItem.price} {" "} {currency.currency}
          </div>
        </td>
        <td style={{ position: "relative" }}>
          {
             (outOfStock === "") ? 
             <>
             <Button
              style={{ borderColor: "#e7e7e7" }}
              variant="light"
              onClick={() => decrementCounter()}
            >
              -
            </Button><Button
              style={{ borderColor: "#e7e7e7", marginLeft: ".2rem" }}
              variant="light"
            >
                {counter}
              </Button><Button
                style={{ borderColor: "#e7e7e7", marginLeft: ".2rem" }}
                variant="light"
                onClick={() => incrementCounter(cartItem)}
              >
                +
              </Button>
              </> 
              : <><Button
              style={{ borderColor: "#e7e7e7" }}
              variant="light"
              onClick={() => decrementCounter()}
            >
              -
            </Button><Button
              style={{ borderColor: "#e7e7e7", marginLeft: ".2rem" }}
              variant="light"
            >
                Out of stock
              </Button><Button
                style={{ borderColor: "#e7e7e7", marginLeft: ".2rem" }}
                variant="light"
                onClick={() => incrementCounter(cartItem)}
              >
                +
              </Button></>
          }
        </td>
        <td style={{ position: "relative" }}>
          <div style={{ paddingTop: "7px" }}>
            {cartItem.price * counter} {" "} {currency.currency}
          </div>
        </td>

        <td align="center">
          <Button variant="light" onClick={() => removeItem(cartItem)}>
            Remove
          </Button>
        </td>
    </>
}

export default CartItem;