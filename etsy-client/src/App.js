import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';

function NotFound() {
  return <div>not found man!!</div>;
}
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
