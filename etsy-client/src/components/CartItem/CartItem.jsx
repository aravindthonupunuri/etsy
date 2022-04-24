import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

function CartItem({ cartItem, removeItem, evaluatePrice }) {
  const [counter, setCounter] = useState(cartItem.requestedQuantity);
  const [outOfStock, setOutOfStock] = useState("");
  const currency = useSelector(state => state.currencyState);
  const [message, setMessage] = useState("");
  const [giftCard, setGiftCard] = useState(false);

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
    else if(counter === 1) {
      removeItem(cartItem)
    }
  }

  if (outOfStock === "") {
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

    <td style={{ position: "relative" }}>
      <div style={{ paddingTop: "7px" }}>
        <input type="checkbox" onChange={() => setGiftCard(!giftCard)}>
        </input>
        {
          (giftCard) ?
            <div style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
              <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Message : </label></div>
              <input name="message"  className="form-control" id="message" onChange={(e) => {setMessage(e.target.value); cartItem.message = e.target.value}} value={message} aria-describedby="descriptionHelp" placeholder="Gift Message" autoFocus required={true} />
            </div> : <></>
        }
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