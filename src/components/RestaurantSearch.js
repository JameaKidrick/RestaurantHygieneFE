import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// ACTIONS
import { placeLocator } from '../actions';

const RestaurantSearch = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('mongolian grill')
  const [inputType, setInputType] = useState('textquery') // ALSO ACCEPTS phonenumber (IN INTERNATIONAL FORMAT +1 FOR US)
  const [fields, setFields] = useState('photos,formatted_address,name,opening_hours,rating') // OPTIONAL // CAN INCLUDE: business_status, formatted_address, geometry, icon,name, permanently_closed, photos, place_id, plus_code, types
  const [location, setLocation] = useState('circle:2000@47.6918452,-122.2226413') // OPTIONAL // ALSO ACCEPTS point:lat,lng
  const [parameters, setParameters] = useState({ input: input, inputType: inputType, fields: fields, location: location })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(placeLocator(parameters))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
        type='text'
        />
        <button>TEST</button>
      </form>
    </div>
  )
};

export default RestaurantSearch;



/* 
PREFERED DATA STRUCTURE TO SEND BACK:
  {
    INPUT: 'TEXT',
    INPUTTYPE: 'TEXT',
    FIELDS: 'TEXT',
    LOCATION: 'TEXT'
  }
*/