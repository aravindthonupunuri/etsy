import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import backendServer from '../../webconfig';
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import Appbar from "../Appbar/Appbar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router';
import { addItemToCart } from "../../actions/cartAction";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useSelector } from "react-redux";

export default function ItemDetails() {
    const dispatch = useDispatch();
    const hist = useHistory();
    const { shopName } = useParams();
    const location = useLocation();
    const currency = useSelector(state => state.currencyState)
    const itemDetails = location.state.item;
    let [item] = useState({
        id: itemDetails._id,
        itemname: itemDetails.itemname,
        itemimage: itemDetails.itemimage,
        description: itemDetails.description,
        price: itemDetails.price,
        available_quantity: itemDetails.available_quantity,
        category: itemDetails.category,
        shopname: itemDetails.shopname,
        salescount: itemDetails.salescount
    });

    const [counter, setCounter] = useState(1);
    const [outOfStock, setOutOfStock] = useState("");
    if (item.available_quantity === 0 && outOfStock === "") setOutOfStock("Out of Stock")
    let incrementCounter = () => {
        if (counter <= item.available_quantity) {
            setCounter(counter + 1);
            if (counter + 1 > item.available_quantity) setOutOfStock("Out of Stock")
        }
    }
    let decrementCounter = () => {
        if (counter > 1) {
            setCounter(counter - 1);
            setOutOfStock("");
        }
    }

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
                if (favItems[i].itemId === item.id) {
                    setIsFav(true);
                    break;
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isFav]
    )


    let addToCart = async () => {
        dispatch(addItemToCart(item, counter));
        hist.push("/cart")
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
            body: JSON.stringify({ itemId: item.id }),
        })
        if (res.status) {
            setIsFav(true)
        }
    }

    let unMarkFav = async () => {
        const token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/user/favourites/${item.id}`, {
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
                <Col sm = {5}>
                    <img src={item.itemimage} alt="alt" style={{ width: '500px', height: '500px' }} />
                </Col>
                <Col sm = {1}>
                <button style = {{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        marginTop: '10px'
                    }}>
                    <FavoriteBorderIcon
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
                    </button>                
                </Col>
                <Col>
                    <p style = {{textAlign: 'right'}}>
                        <Link to={`/shop/${shopName}`}>
                            {shopName}
                        </Link>
                        <p> sales count {itemDetails.salescount} </p>
                    </p>
                    <p style={{fontSize: '30px'}}> {item.itemname} </p>
                    
                    <span style={{fontWeight: 'bold', fontSize: '20px'}}>price is {item.price} {" "} {currency.currency}</span>
                    <br></br>
                    <br></br>
                    <p style={{fontSize: '20px'}}> Description : {item['description']}</p>
                    <br></br>
                    <Button
                        style={{ borderColor: "#e7e7e7" }}
                        variant="light"
                        onClick={decrementCounter}
                    >
                        -
                    </Button>
                    <Button
                        style={{ borderColor: "#e7e7e7", marginLeft: ".2rem" }}
                        variant="light"
                    >
                        {counter}
                    </Button>
                    <Button
                        style={{ borderColor: "#e7e7e7", marginLeft: ".2rem" }}
                        variant="light"
                        onClick={incrementCounter}
                    >
                        +
                    </Button>
                    {outOfStock !== "" ?
                        <div style={{ fontSize: '30px', color: 'red' }}>
                            {outOfStock}
                        </div> :
                        <Button onClick={addToCart} style = {{marginLeft: '15px'}}>Add to cart</Button>
                    }
                </Col>
            </Row>   
        </Container>
    </div>
}