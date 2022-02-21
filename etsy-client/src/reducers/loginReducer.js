const initialState = {name: "", password: ""}

export default function loginReducer(loginstate = initialState, action) {
    switch(action.type) {
       case 'loginState': {
        console.log("in reducer loginState action" + action.name);
        return {
            ...loginstate,
            name: action.name
        }
       }
       default: {
        return loginstate 
       }
             
    }
}

