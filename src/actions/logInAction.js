import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';

// ACTION CREATORS
export const logInUser = (data, history, location) => dispatch => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .post('/auth/login', data)
    .then(response => {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.user_id })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user_id', response.data.user_id)
      console.log(response)
      if(location.state !== undefined && location.state.last.includes('/restaurant/')){
        history.push(location.state.next)
      }else{
        history.push('/')
      }
    })
    .catch(error => {
      console.log(error.response)
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
    })
}

export const logInStatus = (user_id) => dispatch => {
  if(localStorage.getItem('token')){
    dispatch({ type: USER_LOGGED_IN, payload: user_id })
  }
}

export const logOutUser = () => dispatch => {
  localStorage.removeItem('token')
  dispatch({ type: LOGOUT_SUCCESS })
}