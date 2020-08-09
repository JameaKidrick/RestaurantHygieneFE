import { LOCATION_SUCCESS, NEXT_PAGE_LOCATION_SUCCESS, LOGOUT_SUCCESS, RESET_STATE } from '../actions';

const initialState = {
  places: [],
  pages: [],
  page_number: 0,
  next_page: '',
  single_restaurant: [],
  test: '',
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