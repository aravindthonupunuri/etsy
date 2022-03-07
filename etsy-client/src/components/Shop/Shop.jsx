import React, { useState, useEffect } from 'react';
import { Col, Container, FormControl, Row } from 'react-bootstrap';
import backendServer from '../../webconfig';
import Appbar from '../Appbar/Appbar';
import Item from '../Item/Item';
import ItemComponent from '../ItemComponent/ItemComponent';
import EditIcon from '@mui/icons-material/Edit';

require('./Shop.css');

export default function Shop() {
    const [nameOfShop, setShopName] = useState("");
    const [shopItems, setShopItems] = useState([]);
    const [filtereShopItems, setFilterShopItems] = useState([]);
    const [shopDetails, setShopDetails] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [isShop, setShop] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [nameToSearch, setNameToSearch] = useState("");
    const handleEvent = (e) => {
        setNameToSearch(e.target.value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/shop`, {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        let shopDetails = await res.json();
        // console.log("shop details length" + shopDetails.length)
        // console.log("getting shop details done")
        if (shopDetails.length !== 0) {
            // console.log("hii using effect 200..!")
            shopDetails = shopDetails[0];
            setShopDetails(shopDetails);
            setShop(true);
        }
        else {
            // console.log("hii using effect!")
            setShop(false);
        }
    }, [])

    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps        
        async () => {
            console.log("in component of shop!")
            const token = sessionStorage.getItem('token');
            let res = await fetch(`${backendServer}/api/user/profile`, {
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
        }, []
    )

    const modalClosed = () => {
        getShopItems();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getShopItems = async () => {
        // console.log("in get shop items")
        const token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/shop/items/${shopDetails.shopname}`, {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        let result = await res.json();
        // console.log("number of items" + result.length)
        // console.log("doneee get shop items")
        // console.log("huhu " + result[0].itemname);
        setShopItems(result);
        setFilterShopItems(result);
    }

    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // eslint-disable-next-line no-use-before-define
        getShopItems, [shopDetails]
    );



    const checkAndCreateShop = async () => {
        const obj = {
            shopname: nameOfShop,
            shopimage: "image"
        }
        const token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/upload/shop`, {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(obj),
        })
        if (res.status === 200) {
            setShop(true);
            setShopDetails(obj)
        }
        else setErrorMsg("shop name already exits enter a valid shop name");
    }

    if (isShop === true) {
        let shopname = shopDetails.shopname
        let username = userDetails.username

        return <div>
            <Appbar />
            <div>
                <h1>
                    Welcome {username}
                </h1>
                <h2>
                    This is your shop name {shopname}
                </h2>
                <p> These are your items.. </p>
                <p>
                </p>
                <Row>
                    {

                        filtereShopItems.map(
                            shopItem => (
                                <div>
                                    <Col sm={2} key={shopItem.id}>
                                        <React.Fragment>
                                            <ItemComponent id={shopItem.id} item={shopItem} />
                                        </React.Fragment>
                                    </Col>
                                    <Col>
                                    <EditIcon></EditIcon>
                                    </Col>
                                </div>

                            )
                        )
                    }
                </Row>
                <Item shopname={shopname} modalClosed={modalClosed} />
            </div>
        </div>
    }
    else if (isShop === false) {
        return <div>
            <Appbar />
            <div>
                <FormControl onChange={(e) => { setShopName(e.target.value) }}
                    style={{ width: "300px", marginTop: "100px", left: 0, marginLeft: "100px" }}
                    type="search" placeholder="Enter Shop Name" className="mr-2 barsize" aria-label="Search" />
                <div className="text-danger" style={{ marginLeft: "400px" }}>
                    {errorMsg !== "" ? <h5>{errorMsg}</h5> : null}
                </div>
                <button onClick={checkAndCreateShop} className="btn btn-warning btn-lg btn-block" style={{ marginLeft: "400px", marginTop: "10px" }}>
                    Check Availability
                </button>
            </div>
        </div>
    }
    else {
        return <div></div>
    }
}