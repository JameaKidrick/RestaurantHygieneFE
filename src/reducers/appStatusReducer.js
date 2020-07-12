import {START_FETCHING, FETCH_FAILURE, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOCATION_SUCCESS, NEXT_PAGE_LOCATION_SUCCESS, RESET} from '../actions';

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