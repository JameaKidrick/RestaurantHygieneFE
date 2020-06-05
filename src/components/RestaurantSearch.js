import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

// ACTIONS
import { placeLocator } from '../actions';

const RestaurantSearch = () => {
  const dispatch = useDispatch();
  const places = useSelector(state => state.googleAPIReducer.places)
  const status = useSelector(state => state.googleAPIReducer.status)
  const [value, setValue] = useState('1')
  const [radius, setRadius] = useState('2000')
  const [phoneNumberValidation, setPhoneNumberValidation] = useState(false)
  // ALSO ACCEPTS phonenumber (IN INTERNATIONAL FORMAT +1 FOR US)
  // OPTIONAL // CAN INCLUDE: business_status, formatted_address, geometry, icon,name, permanently_closed, photos, place_id, plus_code, types
  const [location, setLocation] = useState(`circle:${radius}@39.456219,-77.963913`); // OPTIONAL // ALSO ACCEPTS point:lat,lng
  const [parameters, setParameters] = useState({
    input: '',
    inputType: '',
    fields:
      'place_id,business_status,geometry,icon,photos,formatted_address,name,opening_hours,rating,types,permanently_closed',
    location: location,
  });

  const handleChange = (e) => {
    if(e.target.name === 'radius'){
      setRadius(e.target.value)
    }else if(e.target.name === 'phonenumber'){
      console.log('phonenumber', e.target.value)
      setValue(e.target.value)
      if(isNaN(Number(value))){
        setPhoneNumberValidation(true)
      }else{
        setPhoneNumberValidation(false)
      }
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
      setLocation(`circle:${radius}@39.456219,-77.963913`)
      dispatch(placeLocator(parameters))
    }
  };

  console.log(places, status)

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        {parameters.inputType === 'textquery' && (
          <>
            <br />
            <input
            type='text'
            placeholder='Enter Name or Address'
            name='input'
            onChange={handleChange}
            />
          </>
        )}
        {parameters.inputType === 'phonenumber' && (
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
            <label htmlFor='radius'>Choose radius: </label>
            <select name='radius' onChange={handleChange}>
              <option value='2000'>1 mile</option>
              <option value='5000'>3 miles</option>
              <option value='10000'>5 miles</option>
              <option value='20000'>10 miles</option>
            </select>
            {phoneNumberValidation && (
              <p>Invalid phone number</p>
            )}
          </>
        )}
        <br />
        <button>Find restaurant</button>
      </form>
      {status === 'ZERO_RESULTS' ? <div>No restaurants found within desired radius</div>: places.length > 0 ? 
        places.map((restaurant, restaurantIndex) => {
          return(
            <div key={restaurantIndex}>
              {/* {restaurant.photos.map((pic, photoIndex) => {
                return(
                  <div key={photoIndex}>{pic.html_attributes}</div>
                )
              })} */}
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
        }) : false
      }
    </div>
  );
};

export default RestaurantSearch;

/*
data:
candidates: []
status: "ZERO_RESULTS"
__proto__: Object
headers: {content-length: "41", content-type: "application/json; charset=utf-8"}
request: XMLHttpRequest {klIsCORSRequest: true, readyState: 4, timeout: 0, RequestSend: ƒ, onreadystatechange: ƒ, …}
status: 200
statusText: "OK"
*/