const initialState = {emailId: ""}

export default function loginReducer(loginstate = initialState, action) {
    switch(action.type) {
       case 'loginState': {
        console.log("in reducer loginState action" + action.emailId);
        return {
            ...loginstate,
            emailId: action.emailId
        }
       }
       case 'logoutState': {
           console.log("in logout")
        return {
            emailId: ""
        }           
       }
       default: {
        return loginstate 
       }             
    }
}