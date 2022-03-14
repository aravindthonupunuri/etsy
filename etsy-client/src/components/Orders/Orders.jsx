import Appbar from "../Appbar/Appbar";
import React, { useState, useEffect } from 'react'
import backendServer from '../../webconfig';
import ItemComponent from "../ItemComponent/ItemComponent";
import { Col, Row } from "react-bootstrap";

export default function Orders() {
    const [ordersList, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        async () => {
            const token = sessionStorage.getItem('token');
            let res = await fetch(`${backendServer}/api/orders`, {
                method: 'GET',
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            })
            let result = await res.json();
            setOrders(result)
        }, []
    )

    let getOrderItems = async (orderid) => {
        const token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/orders/${orderid}`, {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        let result = await res.json();
        setOrderItems(result);
    }

    return <div>
        <Appbar />
        {

            ordersList.map(
                order =>
                    <div key={order.id} onClick={() => { getOrderItems(order.id) }}>
                        {order.id}
                        <Row>
                            {
                                orderItems.map(
                                    item => (
                                        <Col sm={2} key={item.id}>
                                            <React.Fragment>
                                                <ItemComponent id={item.id} item={item} />
                                            </React.Fragment>
                                        </Col>
                                    )
                                )
                            }
                        </Row>
                    </div>
            )

        }
    </div>
}