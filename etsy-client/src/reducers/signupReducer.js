const initialState = {emailId: "", username: ""}

export default function signupReducer(signupState = initialState, action) {
    switch(action.type) {
       case 'signupState': {
        console.log("in reducer signupState action" + action.emailId);
        return {
            ...signupState,
            ...action
        }
       }
       default: {
        return signupState
       }             
    }
}