import { LOCATION_SUCCESS, NEXT_PAGE_LOCATION_SUCCESS, FETCH_RESTAURANT_SUCCESS, LOGOUT_SUCCESS, RESET_STATE } from '../actions';
import { places } from '../components/dummyData';

const initialState = {
  places: [],
  pages: [],
  next_page: '',
  single_restaurant: [],
  status: 'OK'
}

export const googleAPIReducer = (state = initialState, action) => {
  switch (action.type){
    case LOCATION_SUCCESS:
      return{
        ...state,
        places: action.payload,
        pages: [action.pages],
        next_page: action.next_page,
        status: action.status
      };
    case NEXT_PAGE_LOCATION_SUCCESS:
      return{
        ...state,
        places: action.payload,
        pages: [...state.pages, action.pages],
        next_page: action.next_page,
        status: action.status
      };
    case FETCH_RESTAURANT_SUCCESS:
      return{
        ...state,
        single_restaurant: action.payload
      }
    case LOGOUT_SUCCESS:
      return{
        ...state,
        places: [],
        pages: [],
        next_page: ''
      };
    case RESET_STATE:
      return{
        places: [],
        pages: [],
        page_number: 0,
        next_page: '',
        single_restaurant: [],
        test: '',
        status: 'OK'
      }
    default:
      return state
  }
}