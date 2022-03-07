/* eslint-disable react-hooks/exhaustive-deps */
import Appbar from "../Appbar/Appbar";
import React, { useState, useEffect } from 'react'
import backendServer from '../../webconfig';
import { Col, Container, Row } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import ItemComponent from "../ItemComponent/ItemComponent";
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router';

export default function Profile() {
    // console.log("in profile..");
    const hist = useHistory();
    const [filtereProfileItems, setFilterProfileItems] = useState([]);

    const [profileDetails, setProfileDetails] = useState([]);
    const [favouriteItems, setFavouriteItems] = useState([]);

    const [nameToSearch, setNameToSearch] = useState("");
    const handleFilterEvent = (e) => {
        setNameToSearch(e.target.value);
    }

    useEffect(
        async () => {
            // console.log("in set profile details");
            const token = sessionStorage.getItem('token');
            let res = await fetch(`${backendServer}/api/user/favourites`, {
                method: 'GET',
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            })
            let result = await res.json();
            let favItems = [];
            for (let i = 0; i < result.length; i++) {
                let res = await fetch(`${backendServer}/api/item/${result[i].itemId}`, {
                    method: 'GET',
                    headers: {
                        'auth-token': token,
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                })
                res = await res.json();
                // console.log(res[0])
                favItems.push(res)
            }
            setFavouriteItems(favItems);
            setFilterProfileItems(favItems);
        }, []
    )

    const updateProfile  = () => {
        hist.push("/updateprofile")
    }

    useEffect(
        async () => {
            console.log("in set profile details");
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
            setProfileDetails(result);
        }, [
            // updatedProfileToggle
        ]
    )

    function filterItems(name) {
        console.log("in home filter items" + name);
        let res = favouriteItems.filter(
            favItem => favItem.itemname.includes(name)
        )
        setFilterProfileItems(res)
    }

    return <div>
        <Appbar />
        {console.log("profile image " + profileDetails.profilePicture)}
        <Container>
            <Row>
                <Col>
                    <img
                        className="shop-image"
                        style={{ width: "200px", height: "200px" }}
                        src={profileDetails.profilePicture}
                        alt="alt"
                    />
                </Col>
                <Col>
                    <div>
                        name: {profileDetails.username}
                    </div>
                    <div>
                        email: {profileDetails.emailId}
                    </div>
                    <EditIcon onClick={updateProfile} />
                </Col>
            </Row>


        </Container>
        <p style={{ fontWeight: "bold", fontSize: 30 }}> These are your favourite items</p>
        <Container>
            <Row>
                <Col className="col-6">
                </Col>
                <Col >
                    <input style={{ width: 500 }} onChange={handleFilterEvent} type="search" placeholder="Search" className="mr-2 barsize" aria-label="Search" />
                </Col>
                <Col>
                    <SearchIcon onClick={() => filterItems(nameToSearch)} />
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                {
                    filtereProfileItems.map(
                        favouriteItem => (
                            <Col sm={2} key={favouriteItem.id}>
                                <React.Fragment>
                                    <ItemComponent id={favouriteItem.id} item={favouriteItem} />
                                </React.Fragment>
                            </Col>
                        )
                    )
                }
            </Row>
        </Container>
    </div>
}