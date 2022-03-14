const initialState = {emailId: ""}

export default function loginReducer(loginstate = initialState, action) {
    switch(action.type) {
       case 'loginState': {
        return {
            ...loginstate,
            emailId: action.emailId
        }
       }
       case 'logoutState': {
        return {
            emailId: ""
        }           
       }
       default: {
        return loginstate 
       }             
    }
}