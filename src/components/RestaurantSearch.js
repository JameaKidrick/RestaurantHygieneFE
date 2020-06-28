import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-phone-number-input/style.css'
import * as Yup from "yup";

// ACTIONS
import { placeLocator, placeLocator_nextPage } from '../actions';

const RestaurantSearch = (props) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.appStatusReducer.isFetching)
  const places = useSelector(state => state.googleAPIReducer.places)
  const pages = useSelector(state => state.googleAPIReducer.pages)
  const next_page = useSelector(state => state.googleAPIReducer.next_page)
  const status = useSelector(state => state.googleAPIReducer.status)

  const usStates = ['State*', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon','Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [userLocation, setUserLocation] = useState({})
  const [parameters, setParameters] = useState({
    query: '',
    type: 'restaurant',
    radius: 2000,
    userLocation: userLocation
  });
  const [formErrors, setFormErrors] = useState({
    query: '',
    radius: '',
    userCity: '',
    userState: ''
  })

  let searchFormSchema = Yup.object().shape({
    query: Yup.string(),
    radius: Yup.string(),
    userLocation: Yup.object().shape({
      userCity: Yup.string().required('Please provide a city'),
      userState: Yup.string().required('Please provide a state'),
      userAddress: Yup.string()
    })
  })

  useEffect(() => {
    parameters['userLocation'] = userLocation

      searchFormSchema.isValid(parameters).then(valid => {
        setButtonDisabled(!valid)
      })
    
  }, [parameters, userLocation, searchFormSchema]);

  const handleChange = (e) => {
    e.persist();

    if(e.target.name === 'userAddress' || e.target.name === 'userCity' || e.target.name === 'userState'){
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
    setCurrentPageNumber(1)
    dispatch(placeLocator(parameters))
  };

  const handleNextPage = () => {
    setCurrentPageNumber(currentPageNumber  + 1)
    if(!pages[currentPageNumber]){
      dispatch(placeLocator_nextPage(next_page))

    }
  }

  if(isFetching){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <input
        type='text'
        name='userAddress'
        placeholder='Address'
        onChange={handleChange}
        value={parameters.userLocation.userAddress}
        />
        <input
        type='text'
        name='userCity'
        placeholder='City'
        onChange={handleChange}
        value={parameters.userLocation.userCity}
        />
        <select name='userState' onChange={handleChange} value={parameters.userLocation.userState}>
          {usStates.map((state, index) => {
            return(
              <option key={index} value={state}>{state}</option>
            )
          })}
        </select>
        <br />
        <label htmlFor='radius'>Choose radius: </label>
        <select name='radius' onChange={handleChange} value={parameters.radius}>
          <option value='2000'>1 mile</option>
          <option value='5000'>3 miles</option>
          <option value='10000'>5 miles</option>
          <option value='20000'>10 miles</option>
          <option value='25000'>15 miles</option>
          <option value='35000'>20 miles</option>
          <option value='40000'>25 miles</option>
          <option value='50000'>30 miles</option>
        </select>
        <div>
          <p>Search restaurant by:</p>
          <input
          type='text'
          placeholder='Enter Name or Address'
          name='query'
          onChange={handleChange}
          value={parameters.query}
          />
        </div>
        <br />
        <button disabled={buttonDisabled}>Find restaurants</button>
      </form>
      {status === 'ZERO_RESULTS' ? <div>No restaurants found within desired radius</div>: places.length > 0 ? 
        pages[currentPageNumber - 1].map((restaurant, restaurantIndex) => {
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
      {(pages.length > 1) && (currentPageNumber !== 1)  && (
        <div onClick={()=>setCurrentPageNumber(currentPageNumber - 1)}>{`<--- Back`}</div>
      )}
      {(currentPageNumber !== pages.length || next_page) && (
        <div onClick={()=>handleNextPage()}>{`Next --->`}</div>
      )}
    </div>
  );
};

export default RestaurantSearch;