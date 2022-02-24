/* eslint-disable react-hooks/exhaustive-deps */
import Appbar from "../Appbar/Appbar";
import {useState, useEffect} from 'react'
import backendServer from '../../webconfig';
import { Button, Container, Modal } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';

export default function Profile() {
    console.log("in profile..");    
    const [profileDetails, setProfileDetails] = useState([]);
    const [{ itemname, itemimage, itemdescription, categoryid }, setState] = useState(
        {
            itemname: "",
            itemimage: "",
            itemdescription: "",
            categoryid: ""
        }
    )

    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false);};

    const handleShow = () => setShow(true);

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
        }, []
    ) 
    return <div>
        <Appbar />
        <Container>
            <div>
            name: {profileDetails.username}
            </div>
            <div>
            email: {profileDetails.emailId}
            </div>
        </Container>

        {/* <Button variant="primary" onClick={handleShow}>
            Add Item
        </Button> */}
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
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Item name : </label></div>
                        <input 
                        // onChange={handleEvent}
                         name="itemname" value={itemname} className="form-control" id="itemname" aria-describedby="itemnameHelp" placeholder="Item name" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Item image : </label></div>
                        <input 
                        // onChange={handleEvent}
                         name="itemimage" value={itemimage} className="form-control" id="itemimage" aria-describedby="itemimageHelp" placeholder="Item image" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Item Description : </label></div>
                        <input 
                        // onChange={handleEvent}
                         name="itemdescription" value={itemdescription} className="form-control" id="itemdescription" aria-describedby="itemdescriptionHelp" placeholder="Item description" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%', marginBottom: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Category id : </label></div>
                        <input 
                        // onChange={handleEvent}
                         name="categoryid" value={categoryid} className="form-control" id="categoryid" aria-describedby="categoryidHelp" placeholder="Category id" autoFocus required={true} />
                    </div>
                </div>
            </form>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button 
                // onClick={addItem}
                 variant="primary">
                    Save Changes
                </Button>

            </Modal.Footer>
        </Modal>
    </div>
}