import backendServer from '../webconfig';

export default function setHomeReduxFromDb(payload) {
    return (dispatch) => {
        fetch(`${backendServer}/api/items`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(
            res => res.json()
        ).then(
            res =>
            dispatch({type: 'SET_HOME_DATA_FROM_DB', res})
        )
    }

}