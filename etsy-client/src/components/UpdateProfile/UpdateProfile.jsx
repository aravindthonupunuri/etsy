import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Modal,
    Form,
    Button,
  } from "react-bootstrap";
  import backendServer from '../../webconfig';
  import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import noProfileImage from "../../images/noprofileimage.png";
import firebaseApp from "../../firebaseConfig";    
import Appbar from "../Appbar/Appbar";
import { useHistory } from "react-router-dom";

export default function UpdateProfile() {
    const hist = useHistory();    
    const [userProfilePic, setUserProfilePic] = useState(noProfileImage);
    const [profileDetails, setProfileDetails] = useState([]);
    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            console.log(result)
            setProfileDetails(result);
        }, []
    )    

    const handleEvent = (event) => {
        console.log("event is " + event.target.value)
        setProfileDetails(preState => ({ ...preState, [event.target.name]: event.target.value }))
    }

    const updateUserDetails = async (e) => {
        e.preventDefault();
          const storage = getStorage(firebaseApp);
          const imagesRef = ref(storage, `/Profile/${userProfilePic.name}`);
    
          const uploadTask = uploadBytesResumable(imagesRef, userProfilePic);
    
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
                console.log("File available at", downloadURL);
    
                const updatedUser = {
                  emailId: profileDetails.emailId,
                  username: profileDetails.username,
                  dateofbirth: profileDetails.dateofbirth,
                  phonenumber: profileDetails.phonenumber,
                  address: profileDetails.address,
                  country: profileDetails.country,
                  gender: profileDetails.gender,
                  city: profileDetails.city,
                  profilePicture: downloadURL,
                  about: profileDetails.about,
                };
    
                updateUser(updatedUser);
                hist.push("/profile")
              });
            }
          );
        }
    
      const updateUser = async (user) => {
        const token = sessionStorage.getItem("token");
    
        let res = await fetch(`${backendServer}/api/user/update/profile`, {
          method: "PUT",
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(user),
        });
    
        if (res.status === 200) {
          let response = await res.json();
          console.log(response);
        }
      };



    return (
        <Container>
            {console.log("output" + profileDetails)}
            {console.log(profileDetails)}
          <Appbar />
          <p style={{ fontWeight: "bold", textAlign: "left" }}>
            Your Public Profile
          </p>
          <div className="border">
            <Form>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridUserProfilePic">
                  <div style={{ display: "flex", width: "400px" }}>
                    <Form.Label style={{ width: "inherit" }}>
                      Profile Picture
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="itemimage"
                      accept="image/*"
                      onChange={(e) => setUserProfilePic(e.target.files[0])}
                    />
                  </div>
                  <img
                    className="user-image"
                    style={{
                      width: "200px",
                      height: "200px",
                      margin: "auto 160px",
                      float: "left",
                    }}
                    src={profileDetails.profilePicture}
                    alt="alt"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridUserName">
                  <div style={{ display: "flex", width: "400px" }}>
                    <Form.Label style={{ width: "inherit" }}>Your name</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      required
                      value={profileDetails.username}
                      onChange={(e) => handleEvent(e)}
                      placeholder="Name"
                    />
                  </div>
                </Form.Group>
              </Row>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <div style={{ display: "flex", width: "400px" }}>
                    <Form.Label style={{ width: "inherit" }}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={profileDetails.emailId}
                      name="emailId"
                      onChange={(e) => handleEvent(e)}
                      placeholder="Edit email"
                    />
                  </div>
                </Form.Group>
              </Row>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridPhone">
                  <div style={{ display: "flex", width: "400px" }}>
                    <Form.Label style={{ width: "inherit" }}>
                      Phonenumber
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      value={profileDetails.phonenumber}
                      name="phonenumber"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      onChange={(e) => handleEvent(e)}
                      placeholder="XXX-XXX-XXXX"
                    />
                  </div>
                </Form.Group>
              </Row>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridUserGender">
                  <div style={{ display: "flex", width: "400px" }}>
                    <Form.Label style={{ width: "inherit" }}>Gender</Form.Label>
                    <input
                      style={{ marginRight: "6px" }}
                      type="radio"
                      value="Male"
                      name="gender"
                      checked={profileDetails.gender === "Male"}
                      onChange={(e) => handleEvent(e)}
                    />{" "}
                    Male
                    <input
                      style={{ marginLeft: "6px", marginRight: "6px" }}
                      type="radio"
                      value="Female"
                      name="gender"
                      checked={profileDetails.gender === "Female"}
                      onChange={(e) => handleEvent(e)}
                    />{" "}
                    Female
                    <input
                      style={{ marginLeft: "6px", marginRight: "6px" }}
                      type="radio"
                      value="Other"
                      name="gender"
                      checked={profileDetails.gender === "Custom"}
                      onChange={(e) => handleEvent(e)}
                    />{" "}
                    Custom
                  </div>
                </Form.Group>
              </Row>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <div style={{ display: "flex", width: "400px" }}>
                    <Form.Label style={{ width: "inherit" }}>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      required
                      value={profileDetails.city}
                      onChange={(e) => handleEvent(e)}
                      placeholder="City"
                    />
                  </div>
                </Form.Group>
              </Row>
    
              <Row>
                <Form.Group as={Col} controlId="formGridCountry">
                  <div style={{ display: "flex", width: "400px" }}>
                    <Form.Label style={{ width: "inherit" }}>Country</Form.Label>
                    <Form.Select
                      className="countryPicker"
                      name="country"
                      value={profileDetails.country}
                      onChange={(e) => handleEvent(e)}
                      aria-label="Default select example"
                    >
                      <option>Pick a country</option>                      
                      <option value="India">India</option>
                      <option value="United States Of America">United States Of America</option>
                      <option value="Newzeland">NewZeland</option>
                    </Form.Select>
                  </div>
                </Form.Group>
              </Row>
    
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridBithday">
                  <div style={{ display: "flex", width: "400px" }}>
                    <Form.Label style={{ width: "inherit" }}>
                      Date of Birth
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="dateofbirth"
                      value={profileDetails.dateofbirth}
                      onChange={(e) => handleEvent(e)}
                      placeholder="Enter date"
                    />
                  </div>
                </Form.Group>
              </Row>
    
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} controlId="formGridUserName">
                  <div style={{ display: "flex", width: "400px" }}>
                    <Form.Label style={{ width: "inherit" }}>
                      Full Address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      required
                      value={profileDetails.address}
                      onChange={(e) => handleEvent(e)}
                      placeholder="Enter your full Address"
                    />
                  </div>
                </Form.Group>
              </Row>
              <Button
                last
                variant="primary"
                onClick={updateUserDetails}
                type="submit"
              >
                Save changes
              </Button>
            </Form>
          </div>
        </Container>
      );
    }
    