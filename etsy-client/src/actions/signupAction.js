export default function signupAction(signupDetails) {
    // console.log("creating signup action " + signupDetails.emailId)
    return {
        type: "signupState",
        emailId: signupDetails.emailId,
        username: signupDetails.username
    }
}