import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { registerUser } from '../actions';

const Register = (props) => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.appStatusReducer.error)
  const isFetching = useSelector(state => state.appStatusReducer.isFetching)
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  })

  const handleChanges = e => {
    setUser({ ...user, [e.target.name]:e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(user, props.history))
  }

  return(
    <div>
      Hello Register Form!
      <form onSubmit={handleSubmit}>
        <input 
        type='text' 
        name='first_name' 
        placeholder='first name' 
        onChange={handleChanges} 
        />
        <input 
        type='text' 
        name='last_name' 
        placeholder='last name' 
        onChange={handleChanges} 
        />
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
        <button type='submit'>Register</button>
      </form>
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
};

export default Register;