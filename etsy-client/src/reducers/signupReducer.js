const initialState = {emailId: "", username: ""}

export default function signupReducer(signupState = initialState, action) {
    switch(action.type) {
       case 'signupState': {
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