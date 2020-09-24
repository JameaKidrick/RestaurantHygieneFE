import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import DeleteUserModal from './DeleteUserModal';

// ACTIONS
import { editUser } from '../actions'

// STYLING
import { ParentContainer, FormPage, Form, InputContainer, Label, LabelHide, Input, Button, DeleteButton } from '../syles/formStyling'

const MyProfile = (props) => {
  const dispatch = useDispatch()
  const isFetching = useSelector(state => state.appStatusReducer.isFetching)
  const user_id = useSelector(state => state.logInReducer.user_id)
  const [error, setError] = useState(false)
  const [update, setUpdate] = useState({})
  const [success, setSuccess] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [passwordType, setPasswordType] = useState('password')
  const [hideCurrentPassword, setHideCurrentPassword] = useState(true)
  const [currentPasswordType, setCurrentPasswordType] = useState('password')
  const [deleting, setDeleting] = useState(false)
  const [formErrors, setFormErrors] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    confirm_password: 'Please confirm your current password to make these changes.'
  })

  const settingsFormSchema = Yup.object().shape({
    first_name: Yup.string(),
    last_name: Yup.string(),
    username: Yup.string().min(3, 'Usernames must be at least 3 characters long'),
    password: Yup.string().min(6, 'Passwords must be at least 6 characters long'),
    confirm_password: Yup.string().required('Please confirm your current password to make these changes.')
  })

  /************************************** USEEFFECTS **************************************/
  
  useEffect(() => {
    let formValues = Object.values(update)
    let formKeys = Object.keys(update)
    
    formValues.filter((value, index) => {
      if(value === ''){
        delete update[formKeys[index]]
      }
    })
  }, [update])
  
  useEffect(() => {
    if(hidePassword === true){
      setPasswordType('password')
    }else{
      setPasswordType('text')
    }
  }, [hidePassword])

  useEffect(() => {
    if(hideCurrentPassword === true){
      setCurrentPasswordType('password')
    }else{
      setCurrentPasswordType('text')
    }
  }, [hideCurrentPassword])
  
  /************************************** HANDLERS **************************************/

  const handleChanges = (e) => {
    e.persist();
    if(e.target.name === 'hidePassword'){
      setHidePassword(!hidePassword)
    }else if(e.target.name === 'hideCurrentPassword'){
      setHideCurrentPassword(!hideCurrentPassword)
    }else{
      Yup
        .reach(settingsFormSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
          setFormErrors({ ...formErrors, [e.target.name]:'' })
        })
        .catch(err => {
          setFormErrors({ ...formErrors, [e.target.name]:err.errors[0] })
        })
      setUpdate({...update, [e.target.name]: e.target.value})
      if(e.target.name === 'change_password'){
        setError(false)
    }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    settingsFormSchema.isValid(update).then(valid => {
      if(valid === false){
        setError(true)
      }else{
        dispatch(editUser(user_id, update, setSuccess))
      }
    });
  }

  const handleDeletingStatus = () => {
    if(deleting === false){
      setDeleting(true)
    }
  }

  if(isFetching === true){
    return(
      <div>Loading...</div>
    )
  }

  return(
    <>
      <ParentContainer>
        <div id='headerWithMessage'>
          <p id='header'>Settings</p>
          {success && (
            <p id='successMessage'>Your account information has been successfully updated.</p>
          )}
        </div>
        <FormPage>
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <Label>First name</Label>
              <Input
              type='text'
              name='first_name'
              onChange={handleChanges}
              />
            </InputContainer>
            <br />
            <InputContainer>
              <Label>Last name</Label>
              <Input
              type='text'
              name='last_name'
              onChange={handleChanges}
              />
            </InputContainer>
            <br />
            <InputContainer>
              <Label>Username</Label>
              <Input
              type='text'
              name='username'
              onChange={handleChanges}
              />
            </InputContainer>
            <br />
            <InputContainer>
              <Label>New Password</Label>
              <Input
              type={passwordType}
              name='password'
              onChange={handleChanges}
              />
              {update.password && update.password.length < 6 && (<p className="error">{formErrors.password}</p>)}
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
            <br />
            <InputContainer>
              <Label>Current Password<span> *</span></Label>
              <Input
              type={currentPasswordType}
              name='confirm_password'
              onChange={handleChanges}
              />
              {error && (
                <p className="error">{formErrors.confirm_password}</p>
              )}
            </InputContainer>
            <LabelHide htmlFor='hideCurrentPassword'>
              Hide password
              <Input
              type='checkbox'
              name='hideCurrentPassword'
              onChange={handleChanges}
              value={hideCurrentPassword}
              checked={hideCurrentPassword}
              />
            </LabelHide>
            <Button>Submit</Button>
          </Form>
          <DeleteButton onClick={()=>handleDeletingStatus()}>Delete Account</DeleteButton>
        </FormPage>
        {deleting && (
          <DeleteUserModal user_id={user_id} setDeleting={setDeleting} persistor={props.persistor} history={props.history} />
        )}
      </ParentContainer>
      {/* <DeleteUserModal user_id={user_id} deleting={deleting} setDeleting={setDeleting} persistor={props.persistor} history={props.history} /> */}
    </>
  )
}

export default MyProfile;