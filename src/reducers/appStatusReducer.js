import {START_FETCHING, FETCH_FAILURE, LOGIN_SUCCESS, LOCATION_SUCCESS, NEXT_PAGE_LOCATION_SUCCESS} from '../actions';

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

    case NEXT_PAGE_LOCATION_SUCCESS:
    case LOCATION_SUCCESS:
    case LOGIN_SUCCESS:
      return{
        ...state,
        isFetching: false,
        error: ''
      };

    default:
      return state
  }
}