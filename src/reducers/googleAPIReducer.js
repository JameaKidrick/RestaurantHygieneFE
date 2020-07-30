import { LOCATION_SUCCESS, NEXT_PAGE_LOCATION_SUCCESS, LOGOUT_SUCCESS, GET_RESTAURANT } from '../actions';

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
    // case CURRENT_PAGE:
    //   return{
    //     ...state,
    //     page_number: action.payload
    //   };
    // case GET_RESTAURANT:
    //   console.log('INITIAL', action.payload, state.single_restaurant)
    //   return{
    //     ...state,
    //     single_restaurant: action.payload,
    //     test: 'working'
    //   }
    default:
      return state
  }
}