import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { logInStatus, logOutUser, resetResponseState } from './actions';

// COMPONENTS
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
import LogIn from './components/LogIn';
import RestaurantSearch from './components/RestaurantSearch';
import SingleRestaurant from './components/SingleRestaurant';
import MyReviews from './components/MyReviews';
import MyFavoriteRestaurants from './components/MyFavoriteRestaurants';
import Profile from './components/Profile';
import FastfoodIcon from '@material-ui/icons/Fastfood';

// STYLING
import { FontStyle } from './syles/globalStyling'
import { Nav } from './syles/navBar'

function App(props) {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.logInReducer.loggedIn)
  const user_id = useSelector(state => state.logInReducer.user_id)

  useEffect(() => {
    dispatch(logInStatus(user_id));
  }, [])

  return (
    <Router>
      <FontStyle className="App">
        {loggedIn && (
          <Nav>
            <Link to='/'>
              <div className='logoContainer'>
                <FastfoodIcon className='icon' />
                <h2>Restaurant Hygiene</h2>
              </div>
            </Link>
            <div className='links'>
              <Link to='/' onClick={()=> dispatch(resetResponseState())}>Home</Link>
              <Link to='/findrestaurant' onClick={()=> dispatch(resetResponseState())}>Find a Restaurant</Link>
              <Link to='/myreviews'>My Reviews</Link>
              <Link to='/myrestaurants'>My Restaurants</Link>
              <Link to='/settings'>Settings</Link>
              <Link to='/' onClick={() => dispatch(logOutUser(props.persistor, resetResponseState))}>Log out</Link>
            </div>
          </Nav>
        )}
        {!loggedIn && (
          <Nav>
            <Link to='/'>
              <div className='logoContainer'>
                <FastfoodIcon className='icon' />
                <h2>Restaurant Hygiene</h2>
              </div>
            </Link>
            <div className='links'>
              <Link to='/' onClick={()=> dispatch(resetResponseState())}>Home</Link>
              <Link to='/findrestaurant'>Find a Restaurant</Link>
              <Link to='/register'>Signup</Link>
              <Link to='/login'>Log in</Link>
            </div>
          </Nav>
        )}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={LogIn} />
          <Route path='/findrestaurant' component={RestaurantSearch} />
          <Route path='/findrestaurant?page=:number' component={RestaurantSearch} />
          <Route 
          path="/restaurant/:place_id" 
          render={(props) => <SingleRestaurant {...props} 
          persistor={props.persistor} />} />
          <PrivateRoute exact path='/myreviews' component={MyReviews} />
          <PrivateRoute exact path='/myrestaurants' component={MyFavoriteRestaurants} />
          <PrivateRoute exact path='/settings' component={Profile} persistor={props.persistor} />
          <Route component={ErrorPage} />
        </Switch>

      </FontStyle>
    </Router>
  );
}

export default App;
