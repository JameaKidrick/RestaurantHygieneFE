import {START_FETCHING, FETCH_FAILURE} from '../actions';

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
    default:
      return state
  }
}