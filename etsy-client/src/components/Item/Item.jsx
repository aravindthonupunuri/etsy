import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import backendServer from '../../webconfig';

export default function Item(props) {
    const dispatch = useDispatch();
    let shopname = props.shopname;
    const [show, setShow] = useState(false);
    const [{ itemname, itemimage, itemdescription, categoryid }, setState] = useState(
        {
            itemname: "",
            itemimage: "",
            itemdescription: "",
            categoryid: ""
        }
    )

    const handleEvent = (event) => {
        setState(preState => ({ ...preState, [event.target.name]: event.target.value }))
    }

    const handleClose = () => { setShow(false); 
        props.modalClosed()
     };

    const handleShow = () => setShow(true);

    async function addItem() {
        let token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/shop/add/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            mode: 'cors',
            body: JSON.stringify({ itemname, itemimage, itemdescription, categoryid, shopname }),
        })
        dispatch()
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
                        <input onChange={handleEvent} name="itemimage" value={itemimage} className="form-control" id="itemimage" aria-describedby="itemimageHelp" placeholder="Item image" autoFocus required={true} />
                    </div>
                    <div className="form-group" style={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder', padding: '5px' }}><label> Item Description : </label></div>
                        <input onChange={handleEvent} name="itemdescription" value={itemdescription} className="form-control" id="itemdescription" aria-describedby="itemdescriptionHelp" placeholder="Item description" autoFocus required={true} />
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
                <Button onClick={

                    addItem} variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}