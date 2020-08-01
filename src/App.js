import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { logInStatus, logOutUser, resetResponseState } from './actions';

// COMPONENTS
import Home from './components/Home';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
import LogIn from './components/LogIn';
import RestaurantSearch from './components/RestaurantSearch';
import SingleRestaurant from './components/SingleRestaurant';

function App() {
  const loggedIn = useSelector(state => state.logInReducer.loggedIn)
  const user_id = useSelector(state => state.logInReducer.user_id)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logInStatus(user_id));
  }, [])

  return (
    <Router>
      <div className="App">
        <Link to='/' onClick={()=> dispatch(resetResponseState())}>Home</Link>
        <br />
        {loggedIn && (
          <>
            <Link to='/findrestaurant' onClick={()=> dispatch(resetResponseState())}>Find a Restaurant</Link>
            <br />
            <Link to='/' onClick={() => dispatch(logOutUser())}>Log out</Link>
          </>
        )}
        {!loggedIn && (
          <>
            <Link to='/findrestaurant'>Find a Restaurant</Link>
            <br />
            <Link to='/register'>Signup</Link>
            <br />
            <Link to='/login'>Log in</Link>
          </>
        )}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={LogIn} />
          <Route path='/findrestaurant' component={RestaurantSearch} />
          <Route path='/findrestaurant?page=:number' component={RestaurantSearch} />
          <Route path='/restaurant/:place_id' component={SingleRestaurant} />
          <Route component={ErrorPage} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
