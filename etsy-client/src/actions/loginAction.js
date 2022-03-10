
export default function loginAction(emailId) {
    return {
        type: "loginState",
        emailId: emailId
    }
}