import { Component } from 'react';
import { Redirect } from 'react-router-dom';

require('./Login.css');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signin: false
    };
    // this.goSignup = this.goSignup.bind(this);
  }

  goSignup = () => {
    console.log('in go signup');
    // return <Redirect to="/signup" />
    this.setState({ signin: true });
  };

  render() {
    const { signin } = this.state;
    if (signin) {
      return <Redirect to="/signup" />
    }
    return (
      <div>
        <p>
          are you new user?
        </p>
        <button onClick={() => this.setState({ signin: true })}>
          register here
        </button>
      </div>
    );
  }
}

export default Login;
