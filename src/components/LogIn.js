import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { logInUser } from '../actions';

const LogIn = (props) => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.appStatusReducer.error)
  const isFetching = useSelector(state => state.appStatusReducer.isFetching)
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const handleChanges = e => {
    setUser({ ...user, [e.target.name]:e.target.value })
  }

  console.log(user)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
    dispatch(logInUser(user, props.history))
  }

  // console.log(error)
  return(
    <div>
      Hello Log In Form!
      <form onSubmit={handleSubmit}>
        <input 
        type='text' 
        name='username' 
        placeholder='username' 
        onChange={handleChanges} 
        />
        <input 
        type='password' 
        name='password' 
        placeholder='password' 
        onChange={handleChanges} 
        />
        <button type='submit'>Log In</button>
      </form>
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
};

export default LogIn;