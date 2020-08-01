import { FETCH_REVIEWS_SUCCESS, FETCH_RESTAURANTS_SUCCESS, RESET_STATE } from '../actions';

const initialState = {
  restaurant_id: 0,
  place_id: '',
  reviews: []
}

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type){
    case FETCH_REVIEWS_SUCCESS: 
      return{
      ...state,
      reviews: action.payload
    };
    case FETCH_RESTAURANTS_SUCCESS:
      return{
        ...state,
        restaurant_id: action.restaurant_id,
        place_id: action.place_id
      }
    case RESET_STATE:
      return{
        restaurant_id: 0,
        place_id: '',
        reviews: []
      }
    default:
      return state
  }
}