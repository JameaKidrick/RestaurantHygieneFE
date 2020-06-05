import { LOCATION_SUCCESS } from '../actions';

const initialState = {
  places: [],
  status: 'OK'
}

export const googleAPIReducer = (state = initialState, action) => {
  switch (action.type){
    case LOCATION_SUCCESS:
      return{
        ...state,
        places: action.payload,
        status: action.status
      }
    default:
      return state
  }
}