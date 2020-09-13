import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTIONS
import { getAllFavoritesByUserID, resetUserData } from '../actions'

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
      dispatch(getAllFavoritesByUserID(response.data.user_id))
      if(location.state !== null && location.state.last.includes('/restaurant/')){
        if(location.state.next){
          history.push(location.state.next)
        }else{
          history.push(location.state.last)
        }
      }else{
        history.push('/')
      }
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error })
    })
}

export const logInStatus = (user_id) => dispatch => {
  if(localStorage.getItem('token')){
    dispatch({ type: USER_LOGGED_IN, payload: user_id })
  }
}

export const logOutUser = (persistor, resetResponseState) => dispatch => {
  persistor.purge()
    .then(after => {
      localStorage.removeItem('token')
      dispatch({ type: LOGOUT_SUCCESS })
      dispatch(resetResponseState())
      dispatch(resetUserData())
    })
}