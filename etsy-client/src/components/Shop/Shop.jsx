import React, { useState, useEffect } from 'react';
import { Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import backendServer from '../../webconfig';
import Appbar from '../Appbar/Appbar';
import Item from '../Item/Item';
import ItemComponent from '../ItemComponent/ItemComponent';
import EditIcon from '@mui/icons-material/Edit';
import noshopimage from '../../images/noshopimage.jpeg';
import getFirebaseImage from "../../Helper/getFirebaseImage";

require('./Shop.css');

export default function Shop() {
    const [shopimage, setShopImage] = useState(noshopimage);
    const [salescount, setSalescount] = useState(0);
    const [shopImageURL, setShopImageURL] = useState(null);
    const [nameOfShop, setShopName] = useState("");
    const [shopItems, setShopItems] = useState([]);
    const [filtereShopItems, setFilterShopItems] = useState([]);
    const [shopDetails, setShopDetails] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [isShop, setShop] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

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
        if (shopDetails.length !== 0) {
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
        setShopItems(result);
        setFilterShopItems(result);
    }

    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // eslint-disable-next-line no-use-before-define
        getShopItems, [shopDetails]
    );



    const checkAndCreateShop = async () => {
        let downloadURL = await getFirebaseImage(shopimage, `/images/shop`)
        const obj = {
            shopname: nameOfShop,
            shopimage: downloadURL,
            salescount: salescount
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

    const handleUpload = async (e) => {
        e.preventDefault();
        let token = sessionStorage.getItem('token');
        let downloadURL = await getFirebaseImage(shopimage, `/images/shop`)
        // setShopImageURL(downloadURL);
        let res = await fetch(`${backendServer}/api/shop/uploadImage`, {
            method: 'PUT',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({shopname: shopDetails.shopname, shopimage: downloadURL}),
        })
        if (res.status === 200) {
            console.log("updated image")
            // setShop(true);
            // setState(preState => ({ ...preState, [event.target.name]: event.target.value }))
            setShopDetails(
                preState => ({
                    ...preState, 
                    shopname: shopDetails.shopname,
                    shopimage: downloadURL
                })
                )
        }
    }

    if (isShop === true) {
        let shopname = shopDetails.shopname
        let username = userDetails.username

        return <div>
            <Appbar />
            <div>
                <img
                    style={{ width: "200px", height: "200px" }}
                    src={shopDetails.shopimage}
                    alt="alt"
                />
                        <input
                            type="file"
                            required
                            className="custom-file-input"
                            name="res_file"
                            accept="image/*"
                            onChange={(e) => {
                                setShopImage(e.target.files[0]);
                            }}
                        />
                        <button type="submit"
                            onClick={handleUpload}
                        >
                            Upload
                        </button>
                        <div> sales count is {salescount} </div>
                <h1> Welcome {username} </h1>
                <img src={userDetails.profilePicture} style={{ width: "200px", height: "200px" }} alt="alt"/>
                <h2> This is your shop name {shopname} </h2>
                <p> These are your items.. </p>
                <p>
                </p>
                <Row>
                    {filtereShopItems.map(
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
                            </div>)
                    )}
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