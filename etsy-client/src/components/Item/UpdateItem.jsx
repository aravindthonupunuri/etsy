import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import backendServer from '../../webconfig';
import EditIcon from '@mui/icons-material/Edit';
import noItemImage from "../../images/noitemimage.jpeg";
import getFirebaseImage from "../../Helper/getFirebaseImage";

export default function UpdateItem(props) {
    const dispatch = useDispatch();

    const [itemImageFile, setItemImageFile] = useState(noItemImage);
    const [itemImageFileUrl, setItemImageFileUrl] = useState(props.item.itemimage);

    const handleUpload = async (e) => {
        e.preventDefault();
        let downloadURL = await getFirebaseImage(itemImageFile, `/images/${props.shopname}`)
        setItemImageFileUrl(downloadURL);
    }


    // let shopname = props.shopname;
    const [show, setShow] = useState(false);
    const [{ id, itemname, description, price, available_quantity, category }, setState] = useState(
        {
            id: props.item.id,
            itemname: props.item.itemname,
            itemimage: itemImageFileUrl,
            description: props.item.description,
            price: props.item.price,
            available_quantity: props.item.available_quantity,
            category: props.item.category
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

    async function updateItem() {
        let token = sessionStorage.getItem('token');
        await fetch(`${backendServer}/api/shop/update/item`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            mode: 'cors',
            body: JSON.stringify({
                id, itemname, itemImageFileUrl, description, price, available_quantity,
                category
            }),
        })
        // dispatch()
        handleClose()
    }

    return <div>
        <EditIcon onClick={handleShow} style={{marginLeft: '10px'}}>

        </EditIcon>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update the details of item.</Modal.Title>
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
                                setItemImageFile(e.target.files[0]);
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
                        <input onChange={handleEvent} name="categoryid" value={category} className="form-control" id="categoryid" aria-describedby="categoryidHelp" placeholder="Category id" autoFocus required={true} />
                    </div>
                </div>
            </form>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={updateItem} variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}