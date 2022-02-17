import { Component } from 'react';
import Login from '../Login/Login';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>

        in Home,
        Will implement some good interface
        <Login />

      </div>
    );
  }
}

export default Home;
