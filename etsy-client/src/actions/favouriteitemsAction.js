import backendServer from '../webconfig';

export default function favouriteitemsAction(token) {
    return async (dispatch) => {
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
        dispatch({type: 'favouriteState', favItems})     
    }
}