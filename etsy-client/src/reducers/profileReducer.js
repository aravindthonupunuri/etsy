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
    switch(action.type) {
       case 'profileState': {
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