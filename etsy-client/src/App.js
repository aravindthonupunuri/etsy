import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Shop from './components/Shop/Shop';
import Profile from './components/Profile/Profile';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Cart from './components/Cart/Cart';
import Orders from './components/Orders/Orders';

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
        <Route path="/login">
          <Login />
        </Route>  
        <Route path="/shop">
          <Shop />
        </Route>  
        <Route path="/profile">
          <Profile />
          </Route>            
        <Route path="/item/:itemId/:shopName">
          <ItemDetails />
        </Route>  
        <Route path="/cart">
          <Cart />
        </Route>   
        <Route path="/orders">
          <Orders />
        </Route>               
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
