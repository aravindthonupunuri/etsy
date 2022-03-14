import React, { useState, useEffect } from 'react';
import { Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import backendServer from '../../webconfig';
import Appbar from '../Appbar/Appbar';
import Item from '../Item/Item';
import UpdateItem from '../Item/UpdateItem';
import ItemComponent from '../ItemComponent/ItemComponent';
import noshopimage from '../../images/noshopimage.jpeg';
import noprofilemage from '../../images/noprofileimage.png';
import getFirebaseImage from "../../Helper/getFirebaseImage";

require('./Shop.css');

export default function Shop() {
    const [shopimage, setShopImage] = useState(null);
    const [salescount, setSalescount] = useState(0);
    const [nameOfShop, setShopName] = useState("");
    const [shopItems, setShopItems] = useState([]);
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
            setShop(false);
        }
    }, [])

    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps        
        async () => {
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
    }

    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // eslint-disable-next-line no-use-before-define
        getShopItems, [shopDetails]
    );

    const checkAndCreateShop = async () => {
        // let downloadURL = await getFirebaseImage(shopimage, `/images/shop`)
        debugger;
        const obj = {
            shopname: nameOfShop,
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
        let res = await fetch(`${backendServer}/api/shop/uploadImage`, {
            method: 'PUT',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ shopname: shopDetails.shopname, shopimage: downloadURL }),
        })
        if (res.status === 200) {
            setShopDetails(
                preState => ({
                    ...preState,
                    shopname: shopDetails.shopname,
                    shopimage: downloadURL
                })
            )
        }
    }

    const getProfilePic = () => {
        if(userDetails.profilePicture == null) return noprofilemage;
        else return userDetails.profilePicture;
    }
    
    const getShopImage = () => {
        if(shopDetails.shopimage == null) return noshopimage;
        else return shopDetails.shopimage;
    }

    if (isShop === true) {
        let shopname = shopDetails.shopname
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
                                src={getShopImage()}
                                alt="alt"
                            />
                        </Col>
                        <Col sm={8}>
                            <Row>
                                <h2> {shopname} </h2>
                            </Row>
                            <Row>
                                {salescount} sales
                            </Row>
                            <Row>
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
                            </Row>
                            <br></br>
                            <Row>
                                <button type="submit" style={{ width: '100px' }}
                                    onClick={handleUpload}
                                >
                                    Upload
                                </button>
                            </Row>
                        </Col>
                        <Col sm={2}>
                            <h5> Shop Owner </h5> <br></br>
                            <img src={getProfilePic()} style={{ width: "100px", height: "100px" }} alt="alt" /> <br></br>
                            <h5>{username}</h5>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <br></br>
                    <h4> Items </h4>
                    <br></br>
                    <Item shopname={shopname} modalClosed={modalClosed} />
                    <br></br>
                    <Row>
                        {shopItems.map(
                            shopItem => (
                                <Col sm={4} key={shopItem.id}>
                                    <React.Fragment>
                                        <div style={{display: 'flex'}}>
                                            <ItemComponent id={shopItem.id} item={shopItem} />
                                            <UpdateItem item={shopItem} modalClosed={modalClosed} />
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
    else if (isShop === false) {
        return <div>
            <Appbar />
            <div>
                <FormControl onChange={(e) => { setShopName(e.target.value) }}
                    style={{ width: "300px", marginTop: "100px", left: 0, marginLeft: "400px" }}
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