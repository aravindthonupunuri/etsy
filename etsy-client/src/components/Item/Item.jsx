import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import backendServer from '../../webconfig';
import noProfileImage from "../../images/noprofileimage.png";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import firebaseApp from "../../firebaseConfig";

export default function Item(props) {
    const dispatch = useDispatch();

    const [profileImageFile, setProfileImageFile] = useState(null);
    const [profileImageFileUrl, setProfileImageFileUrl] = useState("noProfileImage");

    const handleUpload = async (e) => {
        e.preventDefault();
        const storage = getStorage(firebaseApp);
        const imagesRef = ref(storage, "images");

        const uploadTask = uploadBytesResumable(imagesRef, profileImageFile);

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
                    setProfileImageFileUrl(downloadURL);
                });
            }
        );
    }

    let shopname = props.shopname;
    const [show, setShow] = useState(false);
    const [{ itemname, description, price, available_quantity, categoryid }, setState] = useState(
        {
            itemname: "",
            description: "",
            price: "",
            available_quantity: "",
            categoryid: ""
        }
    )

    const handleEvent = (event) => {
        setState(preState => ({ ...preState, [event.target.name]: event.target.value }))
    }

    const handleClose = () => {
        setShow(false);
        props.modalClosed()
    };

    const handleShow = () => setShow(true);

    async function addItem() {
        let token = sessionStorage.getItem('token');
        console.log("image adding is " + profileImageFileUrl);
        await fetch(`${backendServer}/api/shop/add/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            mode: 'cors',
            body: JSON.stringify({
                itemname, profileImageFileUrl, description, price, available_quantity,
                categoryid, shopname
            }),
        })
        // dispatch()
        handleClose()
    }

    return <div>
        <Button variant="primary" onClick={handleShow}>
            Add Item
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter the details of item you want to add</Modal.Title>
            </Modal.Header>
            <form>
                <div >
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Item name : </label></div>
                        <input onChange={handleEvent} name="itemname" value={itemname} className="form-control" id="itemname" aria-describedby="itemnameHelp" placeholder="Item name" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Item image : </label></div>
                        <input
                            type="file"
                            required
                            className="custom-file-input"
                            name="res_file"
                            accept="image/*"
                            onChange={(e) => {
                                setProfileImageFile(e.target.files[0]);
                            }}
                        />
                        <button type="submit"
                            onClick={handleUpload}
                        >
                            Upload
                        </button>
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Item Description : </label></div>
                        <input onChange={handleEvent} name="description" value={description} className="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Item description" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Item Price : </label></div>
                        <input onChange={handleEvent} name="price" value={price} className="form-control" id="price" aria-describedby="priceHelp" placeholder="Item price" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> available quantity : </label></div>
                        <input onChange={handleEvent} name="available_quantity" value={available_quantity} className="form-control" id="available_quantity" aria-describedby="available_quantityHelp" placeholder="Available quantity" autoFocus required={true} />
                    </div>                    
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%', marginBottom: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Category id : </label></div>
                        <input onChange={handleEvent} name="categoryid" value={categoryid} className="form-control" id="categoryid" aria-describedby="categoryidHelp" placeholder="Category id" autoFocus required={true} />
                    </div>
                </div>
            </form>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={addItem} variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}