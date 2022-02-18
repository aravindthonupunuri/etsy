import {Component} from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
           isLoggedOut: false
        }
    }
    removeCookie = () => {
        
        Cookies.remove('token');
        console.log("removinig cookies");
        this.setState({isLoggedOut: true})
    }
    render() {
        const {isLoggedOut} = this.state;
        if(!isLoggedOut) {
            return (
                <div>
                    <button onClick={this.removeCookie}>
                        logout
                    </button>
                </div>
            )
        }
        else {
            return <Redirect to = "/login" />
        }
    }
}

export default Logout