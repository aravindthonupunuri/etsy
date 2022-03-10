const initialState = {
    emailId: "aaa",
    username: "",
    phonenumber: "",
    profilePicture: "",
    gender: "",
    city: "",
    country: "",
    dateofbirth: "",
    address: "",
    about: ""
}

export default function profileReducer(profileState = initialState, action) {
    // console.log(action)
    switch(action.type) {
       case 'profileState': {
        console.log("in reducer profileState action" + action.action.emailId);
        return {
            ...profileState,
            ...action.action
        }
       }
       default: {
        return profileState
       }             
    }
}