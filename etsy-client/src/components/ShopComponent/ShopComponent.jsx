import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import backendServer from '../../webconfig';
import Appbar from '../Appbar/Appbar';
import ItemComponent from '../ItemComponent/ItemComponent';
import { useParams } from "react-router-dom";

export default function ShopComponent() {
    const { shopName } = useParams();
    const [shopItems, setShopItems] = useState([]);
    const [shopDetails, setShopDetails] = useState({});
    const [userDetails, setUserDetails] = useState({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/shop/${shopName}`, {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        let shopDetails = await res.json();
        shopDetails = shopDetails[0];
        setShopDetails(shopDetails);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps        
        async () => {
            const token = sessionStorage.getItem('token');
            if (shopDetails.shopownerId !== undefined) {
                let res = await fetch(`${backendServer}/api/shopOwnerProfile/${shopDetails.shopownerId}`, {
                    method: 'GET',
                    headers: {
                        'auth-token': token,
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                })
                let result = await res.json();
                result = result[0];
                setUserDetails(result);
            }
        }, [shopDetails]
    )

    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // eslint-disable-next-line no-use-before-define
        // eslint-disable-next-line react-hooks/exhaustive-deps
        async () => {
            const token = sessionStorage.getItem('token');
            let res = await fetch(`${backendServer}/api/shop/items/${shopName}`, {
                method: 'GET',
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            })
            let result = await res.json();
            setShopItems(result);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    );

    let shopname = shopName
    let username = userDetails.username

    return <div>
        <Appbar />
        <div>
            <Container>
                <br></br>
                <Row>
                    <Col sm={2}>
                        <img
                            style={{ width: "200px", height: "200px" }}
                            src={shopDetails.shopimage}
                            alt="alt"
                        />
                    </Col>
                    <Col sm={8}>
                        <Row>
                            <h2> {shopname} </h2>
                        </Row>
                        <Row>
                            {shopDetails.salescount} sales
                        </Row>
                    </Col>
                    <Col sm={2}>
                        <h5> Shop Owner </h5> <br></br>
                        <img src={userDetails.profilePicture} style={{ width: "100px", height: "100px" }} alt="alt" /> <br></br>
                        <h5>{username}</h5>
                    </Col>
                </Row>
            </Container>

            <Container>
                <br></br>
                <h4> Items </h4>
                <br></br>
                <Row>
                    {shopItems.map(
                        shopItem => (
                            <Col sm={3} key={shopItem.id}>
                                <React.Fragment>
                                    <div style={{ display: 'flex' }}>
                                        <ItemComponent id={shopItem.id} item={shopItem} />
                                    </div>
                                </React.Fragment>
                            </Col>
                        )
                    )}
                </Row>
                <br></br>
            </Container>
        </div>
    </div>
}