import React, { useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { logInStatus, logOutUser } from './actions';

// COMPONENTS
import Home from './components/Home';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
import LogIn from './components/LogIn';
import RestaurantSearch from './components/RestaurantSearch';

function App() {
  const loggedIn = useSelector(state => state.logInReducer.loggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logInStatus())
  }, [dispatch])

  return (
    <Router>
      <div className="App">
        <Link to='/'>Home</Link>
        <br />
        {loggedIn && (
          <>
            <Link to='/findrestaurant'>Find a Restaurant</Link>
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
          <Route component={ErrorPage} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
