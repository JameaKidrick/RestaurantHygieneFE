import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING';
export const FETCH_FAILURE = 'FETCH_FAILURE';

// ACTION CREATORS
export const registerUser = (data, history) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .post('/auth/register', data)
    .then(response => {
      localStorage.setItem('token', response.token)
      console.log(response)
      history.push('/')
    })
    .catch(error => {
      console.log(error.response.data.error)
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
    })
}