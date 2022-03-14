/* eslint-disable react-hooks/exhaustive-deps */
import Appbar from "../Appbar/Appbar";
import React, { useState, useEffect } from 'react'
import backendServer from '../../webconfig';
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import ItemComponent from "../ItemComponent/ItemComponent";
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router';
import noprofilemage from '../../images/noprofileimage.png';

export default function Profile() {
    const hist = useHistory();
    const userDetails = useSelector(state => state.profileState)
    const [profileDetails, setProfileDetails] = useState(userDetails);
    const favItems = useSelector(state => state.favouriteState)
    const [favouriteItems, setFavouriteItems] = useState(favItems);
    const [filtereProfileItems, setFilterProfileItems] = useState(favItems);

    const [nameToSearch, setNameToSearch] = useState("");
    const handleFilterEvent = (e) => {
        setNameToSearch(e.target.value);
    }

    useEffect(
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
        let res = favouriteItems.filter(
            favItem => favItem.itemname.includes(name)
        )
        setFilterProfileItems(res)
    }
    const getProfileImage = () => {
        if(profileDetails.profilePicture == null) return noprofilemage;
        else return profileDetails.profilePicture;
    }
    return <div>
        <Appbar />
        <br></br>
        <Container>
            <Row>
                <Col sm = {3}>
                    <img
                        style={{ width: "200px", height: "200px" }}
                        src={getProfileImage()}
                        alt="alt"
                    />
                </Col>
                <Col sm = {7}></Col>
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
        <br></br>
        <Container>
            <Row>
                {
                    filtereProfileItems.map(
                        favouriteItem => (
                            <Col sm={3} key={favouriteItem.id}>
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