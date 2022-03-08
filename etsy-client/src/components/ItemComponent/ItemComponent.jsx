/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import backendServer from '../../webconfig';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useHistory } from "react-router";

export default function ItemComponent(props) {
    const history = useHistory();
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
            for (let i = 0; i < favItems.length; i++) {
                if (favItems[i].itemId === props.id) {
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
        if (res.status) {
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
        if (res.status) {
            setIsFav(false)
        }
    }

    let favStyle;
    if (isFav) {
        favStyle = { color: 'red' }
    }

    let redirectToItemDetails = () => {
        console.log("hi..");
        history.push({
            pathname: `/item/${homeItem.id}/${homeItem.shopname}`,
            state: {
                item: homeItem
            } 
        })
    }

    return <Card onClick={redirectToItemDetails} style={{ width: '300px' }}>
        <Card.Img variant="top" src={homeItem.itemimage} style = {{width: '300px', height: '150px'}}/>
        <Card.Body>
            <Card.Title>{homeItem.itemname}</Card.Title>
            <span>
                <FavoriteIcon
                    style={favStyle}
                    onClick={
                        (event) => {                            
                            !isFav ?
                            markFav()
                            :
                            unMarkFav()
                            event.stopPropagation()
                        }

                    } />
            </span>
            <Card.Text>
                {homeItem.price} $
            </Card.Text>
        </Card.Body>
    </Card>
}