import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import backendServer from '../../webconfig';
import { Button, Col, Container, Row } from "react-bootstrap";
import Appbar from "../Appbar/Appbar";

export default function ItemDetails(props) {
    const { itemId, shopName } = useParams();
    let [item, setItem] = useState({
        id: "",
        itemname: "",
        itemimage: "",
        description: "",
        price: "",
        available_quantity: "",
        category: "",

    });
    let token = sessionStorage.getItem('token');
    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        async () => {
            let res = await fetch(`${backendServer}/api/item/${itemId}`, {
                method: 'GET',
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            })
            let item = await res.json();
            // console.log("items in home" + homeItems.length);
            setItem(item)
        }, [])


    let addToCart = async () => {
        console.log("adding to cart");
        let cartItem = {
            itemid: itemId,
            shopname: shopName,
            quantity: 1
        }
        let res = await fetch(`${backendServer}/api/cart/additem`, {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(cartItem),
        })
        if(res.status === 200) {
            console.log("added to cart");
        }
    }   

    return <div>
        <Appbar />        
        in item page
        <Container>
        <Row>
            <Col>
                <img src={item.itemimage} alt="alt" />
            </Col>
            <Col>
                <p>
                    <a href="">
                        {shopName}
                    </a>
                </p>
                <p>
                    {item.itemname}
                </p>
                <p>
                    {item.available_quantity}
                </p>
            </Col>
        </Row>
        <br></br>
        <Button onClick = {addToCart}>Add to cart</Button>
        </Container>
    </div>
}