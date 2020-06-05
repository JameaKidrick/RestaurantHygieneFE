import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-phone-number-input/style.css'

// ACTIONS
import { placeLocator } from '../actions';

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

  const handleChange = (e) => {
    if(e.target.name === 'phonenumber'){
      console.log('phonenumber', e.target.value)
      setValue(e.target.value)
      if(isNaN(Number(value))){
        setPhoneNumberValidation(true)
      }else{
        setPhoneNumberValidation(false)
      }
    }else if(e.target.name === 'userAddress' || e.target.name === 'userCity' || e.target.name === 'userState'){
      setUserLocation({ ...userLocation, [e.target.name]: e.target.value })
    }else{
      setParameters({ ...parameters, [e.target.name]: e.target.value });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(phoneNumberValidation === false){
      if(parameters.inputType === 'phonenumber'){
        parameters['input'] = `%2B1${value}`
      }
      parameters['userLocation'] = userLocation
      dispatch(placeLocator(parameters))
    }
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
        required
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
          />
          <label htmlFor='name'>Name</label>
          <br />
          <input 
          type='radio' 
          name='inputType' 
          value='textquery' 
          onChange={handleChange}
          />
          <label htmlFor='address'>Address</label>
          <br />
          <input 
          type='radio' 
          name='inputType' 
          value='phonenumber'
          onChange={handleChange}
          />
          <label htmlFor='phonenumber'>Phone Number</label>
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
              required
              />
              <br />
              {phoneNumberValidation && (
                <p>Invalid phone number</p>
              )}
            </>: false
          }
        </div>
        <br />
        <button>Find restaurant</button>
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