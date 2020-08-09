import {LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, USER_LOGGED_IN, FETCH_USER_REVIEWS_SUCCESS, FETCH_FAVORITES_SUCCESS, RESET_USER_DATA} from '../actions';

const initialState = {
  loggedIn: false,
  user_id: 0,
  user_reviews: [],
  user_favorites: []
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
      };
    case FETCH_USER_REVIEWS_SUCCESS:
      return{
        ...state,
        user_reviews: action.payload
      };
    case FETCH_FAVORITES_SUCCESS:
      return{
        ...state,
        user_favorites: action.payload
      };
    case RESET_USER_DATA:
      return{
        ...state,
        user_reviews: [],
        user_favorites: []
      }
    default:
      return state
  }
}