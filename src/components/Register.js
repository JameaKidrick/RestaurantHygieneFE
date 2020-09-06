import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";

// ACTIONS
import { registerUser, resetErrors } from '../actions';

// STYLING
import { ParentContainer, FormPage, Form, InputContainer, Label, LabelHide, Input, Button } from '../syles/loginStyling'

const Register = (props) => {
  const dispatch = useDispatch()
  const error = useSelector(state => state.appStatusReducer.error)
  const isFetching = useSelector(state => state.appStatusReducer.isFetching)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [passwordType, setPasswordType] = useState('password')
  const [formErrors, setFormErrors] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  })

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  })

  const registerFormSchema = Yup.object().shape({
    first_name: Yup.string().required('Please provide a first name'),
    last_name: Yup.string().required('Please provide a last name'),
    username: Yup.string().min(3, 'Usernames must be at least 3 characters long').required('Please provide a username'),
    password: Yup.string().min(6, 'Passwords must be at least 6 characters long').required('Please provide a password')
  })

  useEffect(() => {
    dispatch(resetErrors())
  }, [])

  useEffect(() => {
    registerFormSchema.isValid(user).then(valid => {
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
        .reach(registerFormSchema, e.target.name)
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
    dispatch(registerUser(user, props.history))
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
      <p id='header'>Register</p>
      <FormPage>
        <Form onSubmit={handleSubmit}>
          <InputContainer htmlFor='first_name'>
            <Label>first name<span> *</span></Label>
            <Input
            type='text' 
            name='first_name'
            onChange={handleChanges} 
            value={user.first_name}
            />
          </InputContainer>
          <InputContainer htmlFor='last_name'>
            <Label>last name<span> *</span></Label>
            <Input
            type='text' 
            name='last_name'
            onChange={handleChanges}
            value={user.last_name}
            />
          </InputContainer>
          <InputContainer htmlFor='username'>
            <Label>username<span> *</span></Label>
            <Input
            type='text' 
            name='username'
            onChange={handleChanges} 
            value={user.username}
            />
            {user.username.length < 3 && (<p className="error">{formErrors.username}</p>)}
            {error && (error === 'There is already a user with that username in the database. Please choose a new username.') && (
              <p id='registerError' className='error'>{error}</p>
            )}
          </InputContainer>
          <InputContainer htmlFor='password'>
            <Label>password<span> *</span></Label>
            <Input
            type={passwordType}
            name='password'
            onChange={handleChanges} 
            value={user.password}
            />
            {user.password.length < 6 && (<p className="error">{formErrors.password}</p>)}
          </InputContainer>
          <LabelHide htmlFor='hidePassword'>
            Hide password
            <Input
            type='checkbox'
            name='hidePassword'
            onChange={handleChanges}
            value={hidePassword}
            checked={hidePassword}
            />
          </LabelHide>
          <Button type='submit' disabled={buttonDisabled}>Register</Button>
        </Form>
        <div id='goToLogin'>
          <p>Already have an account? <Link className='link login' to='/login'>Click to login</Link></p>
        </div>
      </FormPage>
    </ParentContainer>
  )
};

export default Register;