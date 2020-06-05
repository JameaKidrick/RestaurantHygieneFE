import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING';
export const LOCATION_SUCCESS = 'LOCATION_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

// ACTION CREATORS
export const placeLocator = (parameters) => dispatch => {
  dispatch({ type: 'START_FETCHING' })
  axiosWithAuth()
    .post(`/locate`, parameters)
    .then(response => {
      console.log(response)
      dispatch({ type: 'LOCATION_SUCCESS', payload: response.data.candidates, status: response.data.status})
    })
    .catch(error => {
      console.log(error.response)
      dispatch({ type: 'FETCH_FAILURE', payload: error.response })
    })
};