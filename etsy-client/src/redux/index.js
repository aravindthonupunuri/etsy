import redux, {createStore} from 'redux'

export function loginState(name, password) {
    return {
        type: "loginState",
        name: name,
        password: password
    }
}

let initialState = {
    name: "",
    password: ""
}

function reducer(state = initialState, action) {
     switch(action.type) {
        case 'loginState':
            return {
                ...state,
                name: action.name
            }
        default:
            return state   
     }
}

 const store = createStore(reducer);
 export default store
