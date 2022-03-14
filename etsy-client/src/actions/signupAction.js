export default function signupAction(signupDetails) {
    return {
        type: "signupState",
        emailId: signupDetails.emailId,
        username: signupDetails.username
    }
}