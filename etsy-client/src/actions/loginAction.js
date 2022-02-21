
export default function loginAction(emailId, password) {
    return {
        type: "loginState",
        emailId: emailId,
        password: password
    }
}