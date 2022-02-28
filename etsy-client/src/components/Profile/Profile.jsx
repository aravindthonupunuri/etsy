/* eslint-disable react-hooks/exhaustive-deps */
import Appbar from "../Appbar/Appbar";
import { useState, useEffect } from 'react'
import backendServer from '../../webconfig';
import { Button, Container, Modal } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import noProfileImage from "../../images/logo.png";
import firebaseApp from "../../firebaseConfig";

export default function Profile() {
    console.log("in profile..");

    const [shopImageFile, setshopImageFile] = useState(null);
    const [shopImageFileUrl, setshopImageFileUrl] = useState(noProfileImage);

    const [profileDetails, setProfileDetails] = useState([]);
    const [updatedProfileToggle, setUpdatedProfileToggle] = useState(false);

    const [{ emailId, username, dateofbirth, phonenumber, address, country, gender, city, profilePicture, about }, setUpdatedProfile] = useState(
        {
            emailId: "",
            username: "",
            dateofbirth: "",
            phonenumber: "",
            address: "",
            country: "",
            gender: "",
            city: "",
            profilePicture: "",
            about: ""
        }
    )

    const handleUpload = async (e) => {
        e.preventDefault();
        const storage = getStorage(firebaseApp);
        const imagesRef = ref(storage, "images");

        const uploadTask = uploadBytesResumable(imagesRef, shopImageFile);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            },
            (error) => {
                console.log(error.code);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const token = sessionStorage.getItem("token");
                    console.log("File available at", downloadURL);
                    setshopImageFileUrl(downloadURL);
                    const profileImage = {
                        image: downloadURL,
                    };
                    // debugger;
                    fetch(`${backendServer}/api/user/uploadProfilePic`, {
                        method: "PUT",
                        headers: {
                            "auth-token": token,
                            "Content-Type": "application/json",
                        },
                        mode: "cors",
                        body: JSON.stringify(profileImage),
                    }).then((res) => {
                        console.log(res);
                    });
                });
            }
        );


    }

    const handleEvent = (event) => {
        console.log("event is " + event.target.value)
        setUpdatedProfile(preState => ({ ...preState, [event.target.name]: event.target.value }))
    }

    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); };

    const handleShow = () => setShow(true);

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
        }, [updatedProfileToggle]
    )

    async function updateProfile() {
        const token = sessionStorage.getItem('token');
        const body = {
            emailId: emailId,
            username: username,
            dateofbirth: dateofbirth,
            phonenumber: phonenumber,
            address: address,
            country: country,
            gender: gender,
            city: city,
            profilePicture: profilePicture,
            about: about
        }
        await fetch(`${backendServer}/api/user/update/profile`, {
            method: 'PUT',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(body),
        })
        setUpdatedProfileToggle(preState => {
            console.log("set profile detials redunda");
            return !preState
        }
        )
        handleClose()
    }

    let countries = [
        "india", "america", "australia", "england"
    ]

    function getCountries() {
        console.log("in countries")
        return countries.map(
            country => (
                <MenuItem
                    // name="country"
                    // id="country"
                    onChange={handleEvent}
                    value={country}
                > {country}
                </MenuItem>
            )
        )
    }

    return <div>
        <Appbar />
        <Container>
            <span>
                <img
                    className="shop-image"
                    style={{ width: "200px", height: "210px" }}
                    src={shopImageFileUrl}
                    alt="alt"
                />
            </span>
            <input
                type="file"
                required
                className="custom-file-input"
                name="res_file"
                accept="image/*"
                onChange={(e) => {
                    setshopImageFile(e.target.files[0]);
                }}
            />
            <button type="submit" onClick={handleUpload}>
                Upload
            </button>
            <div>
                name: {profileDetails.username}
            </div>
            <div>
                email: {profileDetails.emailId}
            </div>
        </Container>
        <div onClick={handleShow}>
            <EditIcon />
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter the details of item you want to add</Modal.Title>
            </Modal.Header>
            <form>
                <div >
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Email Id : </label></div>
                        <input
                            onChange={handleEvent}
                            name="emailId" value={emailId} className="form-control" id="emailId" aria-describedby="emailIdHelp" placeholder="Email Id" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> User name : </label></div>
                        <input
                            onChange={handleEvent}
                            name="username" value={username} className="form-control" id="username" aria-describedby="usernameHelp" placeholder="User name" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Date of birth : </label></div>
                        <input
                            onChange={handleEvent}
                            name="dateofbirth" value={dateofbirth} className="form-control" id="dateofbirth" aria-describedby="dateofbirthHelp" placeholder="Date of birth" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Phone no : </label></div>
                        <input
                            onChange={handleEvent}
                            name="phonenumber" value={phonenumber} className="form-control" id="phonenumber" aria-describedby="phonenumberHelp" placeholder="Phone number" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%', marginBottom: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Address : </label></div>
                        <input
                            onChange={handleEvent}
                            name="address" value={address} className="form-control" id="address" aria-describedby="addressHelp" placeholder="Address" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Country : </label></div>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name="country"
                                id="country"
                                onChange={handleEvent}
                            >
                                {getCountries()}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Gender : </label></div>
                        <input
                            onChange={handleEvent}
                            name="gender" value={gender} className="form-control" id="gender" aria-describedby="genderHelp" placeholder="Gender" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> City : </label></div>
                        <input
                            onChange={handleEvent}
                            name="city" value={city} className="form-control" id="city" aria-describedby="cityHelp" placeholder="City" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%', marginBottom: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> About : </label></div>
                        <input
                            onChange={handleEvent}
                            name="about" value={about} className="form-control" id="about" aria-describedby="aboutHelp" placeholder="About" autoFocus required={true} />
                    </div>
                </div>
            </form>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    onClick={updateProfile}
                    variant="primary">
                    Save Changes
                </Button>

            </Modal.Footer>
        </Modal>
    </div>
}