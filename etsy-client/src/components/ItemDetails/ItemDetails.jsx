import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import backendServer from '../../webconfig';
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import Appbar from "../Appbar/Appbar";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function ItemDetails(props) {
    const hist = useHistory();
    const { itemId, shopName } = useParams();
    const location = useLocation();
    const itemDetails = location.state.item;
    // console.log(location.state.item)
    let [item, setItem] = useState({
        id: itemDetails.id,
        itemname: itemDetails.itemname,
        itemimage: itemDetails.itemimage,
        description: itemDetails.description,
        price: itemDetails.price,
        available_quantity: itemDetails.available_quantity,
        category: itemDetails.category,

    });
    let token = sessionStorage.getItem('token');
    // useEffect(
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     async () => {
    //         let res = await fetch(`${backendServer}/api/item/${itemId}`, {
    //             method: 'GET',
    //             headers: {
    //                 'auth-token': token,
    //                 'Content-Type': 'application/json'
    //             },
    //             mode: 'cors'
    //         })
    //         let item = await res.json();
    //         // console.log("items in home" + homeItems.length);
    //         setItem(item)
    //     }, [])


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
                <img src={item.itemimage} alt="alt" style={{ width: '40rem' }} />
            </Col>
            <Col>
                <p>
                    <Link to = {`/shop/${shopName}`}>
                    {shopName}
                    </Link>
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