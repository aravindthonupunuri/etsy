import backendServer from '../webconfig';

export default function userdetailsAction(token) {
    return async (dispatch) => {
        let res = await fetch(`${backendServer}/api/user/profile`, {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        let action = await res.json();
        action = action[0];   
        // console.log(action)
        dispatch({type: 'profileState', action})     
    }
}