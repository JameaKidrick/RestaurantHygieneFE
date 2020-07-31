import {LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, USER_LOGGED_IN} from '../actions';

const initialState = {
  loggedIn: false,
  user_id: 0
}

export const logInReducer = (state = initialState, action) => {
  switch (action.type){
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case USER_LOGGED_IN:
      return{
        ...state,
        loggedIn: true,
        user_id: action.payload
      };
    case LOGOUT_SUCCESS:
      return{
        ...state,
        loggedIn: false,
        user_id: 0
      }
    default:
      return state
  }
}