import { LOCATION_SUCCESS } from '../actions';

const initialState = {
  places: []
}

export const googleAPIReducer = (state = initialState, action) => {
  switch (action.type){
    case LOCATION_SUCCESS:
      return{
        ...state,
        places: action.payload
      }
    default:
      return state
  }
}