import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

// ACTIONS
import { placeLocator } from '../actions';

const RestaurantSearch = () => {
  const dispatch = useDispatch();
  const places = useSelector(state => state.googleAPIReducer.places)
  const [value, setValue] = useState()
  // ALSO ACCEPTS phonenumber (IN INTERNATIONAL FORMAT +1 FOR US)
  // OPTIONAL // CAN INCLUDE: business_status, formatted_address, geometry, icon,name, permanently_closed, photos, place_id, plus_code, types
  const [location, setLocation] = useState('circle:2000@47.6918452,-122.2226413'); // OPTIONAL // ALSO ACCEPTS point:lat,lng
  const [parameters, setParameters] = useState({
    input: '',
    inputType: '',
    fields:
      'place_id,business_status,geometry,icon,photos,formatted_address,name,opening_hours,rating,types,permanently_closed',
    location: location,
  });

  console.log(places)
  const handleChange = (e) => {
    setParameters({ ...parameters, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(parameters.inputType === 'phonenumber'){
      parameters['input'] = value
    }
    dispatch(placeLocator(parameters))
  };

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
        <label for='name'>Name</label>
        <br />
        <input 
        type='radio' 
        name='inputType' 
        value='textquery' 
        onChange={handleChange}
        />
        <label for='address'>Address</label>
        <br />
        <input 
        type='radio' 
        name='inputType' 
        value='phonenumber'
        onChange={handleChange}
        />
        <label for='phonenumber'>Phone Number</label>
        {parameters.inputType === 'phonenumber' && (
          <>
            <br />
            <PhoneInput
            placeholder='Enter phone number'
            value={value}
            name='input'
            onChange={setValue}
            />
          </>
        )}
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
        <br />
        <button>TEST</button>
      </form>
      {places.length > 0 ? 
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
              {restaurant.opening_hours['open_now'] === true ? 
                <h4>Open</h4>: <h4>Closed</h4>
              }
              <h5>Rating:{restaurant.rating}</h5>
              <p>Address:{restaurant.formatted_address}</p>
            </div>
          )
        })
        :false
      }
    </div>
  );
};

export default RestaurantSearch;