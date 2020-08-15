import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import MyReviews from './MyReviews';


const MyProfile = () => {
  const isFetching = useSelector(state => state.appStatusReducer.isFetching)
  const user_id = useSelector(state => state.logInReducer.user_id)
  const [reviewsStatus, setReviewsStatus] = useState(false)
  const [update, setUpdate] = useState({})
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

  /************************************** HANDLERS **************************************/
  useEffect(() => {
    let formValues = Object.values(update)
    let formKeys = Object.keys(update)
    
    formValues.filter((value, index) => {
      if(value === ''){
        delete update[formKeys[index]]
      }
    })
    settingsFormSchema.isValid(update).then(valid => {
      console.log(valid, formErrors)
    });
  }, [update])

  const handleChanges = (e) => {
    e.persist();
    console.log(e.target.name, e.target.value)
    Yup
      .reach(settingsFormSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        console.log('VALID', valid, e.target.name)
        setFormErrors({ ...formErrors, [e.target.name]:'' })
      })
      .catch(err => {
        console.log('ERROR', err)
        setFormErrors({ ...formErrors, [e.target.name]:err.errors[0] })
      })
      setUpdate({...update, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // MAY HAVE TO ADD A DELETE IF ANY VALUE IS AN EMPTY STRING
    settingsFormSchema.isValid(update).then(valid => {
      console.log(valid, formErrors)
    });
    console.log(update)
  }

  if(isFetching === true){
    return(
      <div>Loading...</div>
    )
  }

  return(
    <div>
      <h2 onClick={()=>setReviewsStatus(true)}>Settings</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First name
          <input
          type='text'
          name='first_name'
          onChange={handleChanges}
          />
        </label>
        <br />
        <label>
          Last name
          <input
          type='text'
          name='last_name'
          onChange={handleChanges}
          />
        </label>
        <br />
        <label>
          Username
          <input
          type='text'
          name='username'
          onChange={handleChanges}
          />
        </label>
        <br />
        <label>
          New Password
          <input
          type='text'
          name='password'
          onChange={handleChanges}
          />
        </label>
        <br />
        <label>
          Confirm Old Password
          <input
          type='text'
          name='confirm_password'
          onChange={handleChanges}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default MyProfile;