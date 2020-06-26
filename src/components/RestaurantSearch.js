import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-phone-number-input/style.css'
import * as Yup from "yup";

// ACTIONS
import { placeLocator } from '../actions';

// PHONE NUMBER IS REQUIRED
// STATE IS REQUIRED

const RestaurantSearch = () => {
  const dispatch = useDispatch();
  const places = useSelector(state => state.googleAPIReducer.places)
  const status = useSelector(state => state.googleAPIReducer.status)

  const usStates = ['State', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
    'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 
    'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [value, setValue] = useState('1')
  const [phoneNumberValidation, setPhoneNumberValidation] = useState(false)
  const [userLocation, setUserLocation] = useState({})
  const [parameters, setParameters] = useState({
    input: '',
    inputType: '',
    fields:
      'place_id,business_status,geometry,icon,photos,formatted_address,name,opening_hours,rating,types,permanently_closed',
    radius: 2000,
    userLocation: userLocation
  });
  const [formErrors, setFormErrors] = useState({
    input: '',
    inputType: '',
    userCity: '',
    userState: '',
    phoneNumber: ''
  })

  let searchFormSchema = Yup.object().shape({
    input: Yup.string().required('Please provide the required information to search with'),
    inputType: Yup.string().required('Please provide a name, address, or phone number to search with'),
    userLocation: Yup.object().shape({
      userCity: Yup.string().required('Please provide a city'),
      userState: Yup.string().required('Please provide a state'),
      userAddress: Yup.string()
    })
  })

  let phoneNumberSchema = Yup.object().shape({
    phonenumber: Yup.number().min(10, 'Please min 10')
  })

  useEffect(() => {

    console.log('PARAMETERS', Number(value), phoneNumberSchema.isValidSync(Number(value)))
    parameters['userLocation'] = userLocation
    searchFormSchema.isValid(parameters).then(valid => {
      console.log(valid)
      setButtonDisabled(!valid)
    })
  }, [parameters, userLocation, searchFormSchema, phoneNumberSchema]);

  const handleChange = (e) => {
    e.persist();

    if(e.target.value === 'phonenumber' || e.target.value === 'textquery'){
      if(parameters.inputType !== e.target.value){
        parameters.input = ''
        setButtonDisabled(false)
      }
    }

    if(e.target.name === 'phonenumber'){
      // console.log('phonenumber', e.target.value)
      setValue(e.target.value)
      // if(isNaN(Number(value))){
      //   setPhoneNumberValidation(true)
      // }else{
      //   setPhoneNumberValidation(false)
      // }

      if(parameters.inputType === 'phonenumber'){
        parameters['input'] = `%2B1${value}`
      }
      // if(phoneNumberValidation === false){
      // }
      Yup
      .reach(phoneNumberSchema, e.target.name)
      .validate(Number(value))
      .then(valid => {
        setFormErrors({ ...formErrors, [e.target.name]:'' })
      })
      .catch(err => {
        setFormErrors({ ...formErrors, [e.target.name]:err.errors[0] })
      })
    }else if(e.target.name === 'userAddress' || e.target.name === 'userCity' || e.target.name === 'userState'){
      // console.log(userLocation)
      Yup
      .reach(searchFormSchema, `userLocation.${e.target.name}`)
      .validate(e.target.value)
      .then(valid => {
        setFormErrors({ ...formErrors, [e.target.name]:'' })
      })
      .catch(err => {
        setFormErrors({ ...formErrors, [e.target.name]:err.errors[0] })
      })
      setUserLocation({ ...userLocation, [e.target.name]: e.target.value })
    }else{
      Yup
      .reach(searchFormSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setFormErrors({ ...formErrors.user, [e.target.name]:'' })
      })
      .catch(err => {
        setFormErrors({ ...formErrors, [e.target.name]:err.errors[0] })
      })
      setParameters({ ...parameters, [e.target.name]: e.target.value });
    }
  };

  /******************************** HANDLE SUBMIT & FORM ********************************/
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(parameters)
    // dispatch(placeLocator(parameters))
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <input
        type='text'
        name='userAddress'
        placeholder='Address'
        onChange={handleChange}
        />
        <input
        type='text'
        name='userCity'
        placeholder='City'
        onChange={handleChange}
        // required
        />
        <select name='userState' onChange={handleChange}>
          {usStates.map((state, index) => {
            return(
              <option key={index} value={state}>{state}</option>
            )
          })}
        </select>
        <br />
        <label htmlFor='radius'>Choose radius: </label>
        <select name='radius' onChange={handleChange}>
          <option value='2000'>1 mile</option>
          <option value='5000'>3 miles</option>
          <option value='10000'>5 miles</option>
          <option value='20000'>10 miles</option>
        </select>
        <div>
          <p>Search restaurant by:</p>
          <input 
          type='radio' 
          name='inputType' 
          value='textquery' 
          onChange={handleChange}
          />Name
          <br />
          <input 
          type='radio' 
          name='inputType' 
          value='phonenumber'
          onChange={handleChange}
          />Phone Number
          {parameters.inputType === 'textquery' ? 
            <>
              <br />
              <input
              type='text'
              placeholder='Enter Name or Address'
              name='input'
              onChange={handleChange}
              />
            </>: parameters.inputType === 'phonenumber' ?
            <>
              <br />
              <p>Searches by phone number are limited to the United States</p>
              <input
              type='tel'
              placeholder='Format: 1234567890'
              name='phonenumber'
              minLength='10'
              maxLength='10'
              onChange={handleChange}
              />
              <br />
              {phoneNumberValidation && (
                <p>Invalid phone number</p>
              )}
            </>: false
          }
        </div>
        <br />
        <button disabled={buttonDisabled}>Find restaurant</button>
      </form>
      {status === 'ZERO_RESULTS' ? <div>No restaurants found within desired radius</div>: places.length > 0 ? 
        places.map((restaurant, restaurantIndex) => {
          return(
            <div key={restaurantIndex}>
              <img src={restaurant.icon} alt='restaurant icon' />
              <h3>{restaurant.name}</h3>
              {restaurant.opening_hours ?
                restaurant.opening_hours['open_now'] === true ? 
                <h4>Open</h4>: <h4>Closed</h4>: false
              }
              {restaurant.rating && (
                <h5>Rating: {restaurant.rating}</h5>
              )}
              <p>Address: {restaurant.formatted_address}</p>
            </div>
          )
        }): false
      }
    </div>
  );
};

export default RestaurantSearch;