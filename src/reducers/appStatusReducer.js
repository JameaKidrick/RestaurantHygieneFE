import {START_FETCHING, FETCH_FAILURE, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOCATION_SUCCESS, NEXT_PAGE_LOCATION_SUCCESS, RESET, FETCH_REVIEWS_SUCCESS, FETCH_RESTAURANTS_SUCCESS, ADD_REVIEW_SUCCESS, FETCH_USER_REVIEWS_SUCCESS, USER_LOGGED_IN, RESET_STATE, FETCH_FAVORITES_SUCCESS, ADD_FAVORITE_SUCCESS, DELETE_FAVORITE_SUCCESS, RESET_USER_DATA, EDIT_USER_SUCCESS} from '../actions';

const initialState = {
  isFetching: false,
  error: ''
}

export const appStatusReducer = (state = initialState, action) => {
  switch (action.type){
    case START_FETCHING:
      return{
        ...state,
        isFetching: true,
        error: ''
      };
    
    case FETCH_FAILURE:
      return{
        ...state,
        isFetching: false,
        error: action.payload
      };

    case EDIT_USER_SUCCESS:
    case RESET_USER_DATA:
    case DELETE_FAVORITE_SUCCESS:
    case ADD_FAVORITE_SUCCESS:
    case FETCH_FAVORITES_SUCCESS:
    case RESET_STATE:
    case USER_LOGGED_IN:
    case FETCH_USER_REVIEWS_SUCCESS:
    case ADD_REVIEW_SUCCESS:
    case FETCH_RESTAURANTS_SUCCESS:
    case FETCH_REVIEWS_SUCCESS:
    case RESET:
    case NEXT_PAGE_LOCATION_SUCCESS:
    case LOCATION_SUCCESS:
    case LOGOUT_SUCCESS:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return{
        ...state,
        isFetching: false,
        error: ''
      };

    default:
      return state
  }
}