import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";

// ACTIONS
import { logInUser, resetErrors } from '../actions';

// STYLING
import { ParentContainer, LoginPage, Form, InputContainer, Label, LabelHide, Input, Button } from '../syles/loginStyling'

const LogIn = (props) => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.appStatusReducer.error)
  const isFetching = useSelector(state => state.appStatusReducer.isFetching)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [passwordType, setPasswordType] = useState('password')
  const [formErrors, setFormErrors] = useState({
    username: 'Please provide a username',
    password: 'Please provide a password'
  })

  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const loginFormSchema = Yup.object().shape({
    username: Yup.string().required('Please provide a username'),
    password: Yup.string().required('Please provide a password')
  })

  useEffect(() => {
    dispatch(resetErrors())
  }, [])

  useEffect(() => {
    loginFormSchema.isValid(user).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [user]);

  useEffect(() => {
    if(hidePassword === true){
      setPasswordType('password')
    }else{
      setPasswordType('text')
    }
  }, [hidePassword])
  
  const handleChanges = e => {
    e.persist();
    if(e.target.name === 'hidePassword'){
      setHidePassword(!hidePassword)
    }else{
      Yup
      .reach(loginFormSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setFormErrors({ ...formErrors, [e.target.name]:'' })
      })
      .catch(err => {
        setFormErrors({ ...formErrors, [e.target.name]:err.errors[0] })
      })
      setUser({ ...user, [e.target.name]:e.target.value })
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(logInUser(user, props.history, props.location))
  }
    
  if(isFetching){
    return(
      <div>
        Loading...
      </div>
    )
  }

  return(
    <ParentContainer>
      <p id='login_header'>Log In</p>
      <LoginPage>
        <Form onSubmit={handleSubmit}>
          <InputContainer htmlFor='username'>
            <Label>username<span> *</span></Label>
            <Input
            type='text' 
            name='username'
            onChange={handleChanges} 
            value={user.username}
            />
          </InputContainer>
          <InputContainer htmlFor='password'>
            <Label>password<span> *</span></Label>
            <Input
            type={passwordType}
            name='password'
            onChange={handleChanges}
            value={user.password}
            />
          </InputContainer>
          <LabelHide htmlFor='hidePassword'>
            <span>Hide password</span>
            <Input
            type='checkbox'
            name='hidePassword'
            onChange={handleChanges}
            value={hidePassword}
            checked={hidePassword}
            />
          </LabelHide>
          <Button id={buttonDisabled ? 'enabled':'disabled'} type='submit' disabled={buttonDisabled}>Log In</Button>
        </Form>
        <div id='goToRegister'>
          <p>Don't have an account? <Link className='link register' to='/register'>Click to register</Link></p>
        </div>
        {error && (error === 'Invalid credentials: Please check your password and try again.' || error === 'Invalid credentials: Please check your username and try again.') && (
          <p id='loginError'>{error}</p>
        )}
      </LoginPage>
    </ParentContainer>
  )
};

export default LogIn;