/* eslint-disable react-hooks/exhaustive-deps */
import { Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import backendServer from '../../webconfig';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ItemComponent(props) {
    let homeItem = props.item
    const [isFav, setIsFav] = useState(false);
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
            let favItems = await res.json();
            for(let i = 0; i < favItems.length; i++) {
                if(favItems[i].itemId === props.id) {
                    setIsFav(true);
                    break;
                } 
            }
        }, [isFav]
    )

    let markFav = async () => {
        const token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/user/add/favourite`, {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ itemId: props.id }),
        })  
        if(res.status) {
            setIsFav(true)
        }      
    }

    let unMarkFav = async () => {
        const token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/user/favourites/${props.id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })  
        if(res.status) {
            console.log("fav deleted")
            setIsFav(false)
        }      
    }

    let favStyle;
    if(isFav) {
        favStyle = {color: 'red'}
    }
    
    return <div>

        <Col sm={2}>
            {homeItem.itemname}
            <br />
            {homeItem.itemimage}
            <FavoriteIcon
                style={favStyle}
                onClick={
                    // () => { console.log("in favorite!") }
                    !isFav ?
                    markFav
                     : 
                     unMarkFav
                    } />
            <br>
            </br>
        </Col>
    </div>
}