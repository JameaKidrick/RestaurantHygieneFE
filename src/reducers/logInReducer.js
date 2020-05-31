import {LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, USER_LOGGED_IN} from '../actions';

const initialState = {
  loggedIn: false
}

export const logInReducer = (state = initialState, action) => {
  switch (action.type){
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case USER_LOGGED_IN:
      return{
        ...state,
        loggedIn: true
      };
    case LOGOUT_SUCCESS:
      return{
        ...state,
        loggedIn: false
      }
    default:
      return state
  }
}