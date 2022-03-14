import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import backendServer from '../../webconfig';
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import Appbar from "../Appbar/Appbar";
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ItemDetails(props) {
    const { itemId, shopName } = useParams();
    const location = useLocation();
    const itemDetails = location.state.item;
    let [item] = useState({
        id: itemDetails.id,
        itemname: itemDetails.itemname,
        itemimage: itemDetails.itemimage,
        description: itemDetails.description,
        price: itemDetails.price,
        available_quantity: itemDetails.available_quantity,
        category: itemDetails.category,

    });
    let token = sessionStorage.getItem('token');
    const [isFav, setIsFav] = useState(false);
    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        async () => {
            const token = sessionStorage.getItem('token');
            let res = await fetch(`${backendServer}/api/user/favourites`, {
                method: 'GET',
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            })
            let favItems = await res.json();
            for (let i = 0; i < favItems.length; i++) {
                if (favItems[i].itemId === props.id) {
                    setIsFav(true);
                    break;
                }
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isFav]
    )


    let addToCart = async () => {
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
        }
    }   

    let markFav = async () => {
        const token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/user/add/favourite`, {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ itemId: props.id }),
        })
        if (res.status) {
            setIsFav(true)
        }
    }

    let unMarkFav = async () => {
        const token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/user/favourites/${props.id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        if (res.status) {
            setIsFav(false)
        }
    }

    let favStyle;
    if (isFav) {
        favStyle = { color: 'red' }
    }

    return <div>
        <Appbar />    
        <Container>
        <Row>
            <Col>
                <img src={item.itemimage} alt="alt" style={{ width: '40rem' }} />
            </Col>
            <Col>
            <FavoriteIcon
                    style={favStyle}
                    onClick={
                        (event) => {                            
                            !isFav ?
                            markFav()
                            :
                            unMarkFav()
                            event.stopPropagation()
                        }

                    } />
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