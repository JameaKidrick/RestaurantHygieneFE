import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES


// ACTION CREATORS
export const placeLocator = (parameters) => dispatch => {
  axiosWithAuth()
    .post(`/locate`, parameters)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
};