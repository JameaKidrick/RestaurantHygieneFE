import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING';
export const LOCATION_SUCCESS = 'LOCATION_SUCCESS';
export const NEXT_PAGE_LOCATION_SUCCESS = 'NEXT_PAGE_LOCATION_SUCCESS';
export const CURRENT_PAGE = 'CURRENT_PAGE';
export const FETCH_RESTAURANT_SUCCESS = 'FETCH_RESTAURANT_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const RESET_STATE = 'RESET_STATE';

// ACTION CREATORS
export const placeLocator = (parameters, history, query) => dispatch => {
  dispatch({ type: 'START_FETCHING' })
  axiosWithAuth()
    .post(`/locate`, parameters)
    .then(response => {
      dispatch({ type: 'LOCATION_SUCCESS', payload: response.data.results, status: response.data.status, next_page: response.data.next_page_token, pages:response.data.results, pageNumber: 'page1'})
      history.replace(`/findrestaurant${query}`)
    })
    .catch(error => {
      dispatch({ type: 'FETCH_FAILURE', payload: error.response })
    })
};

export const placeLocator_nextPage = (pageToken, history, query) => dispatch => {
  dispatch({ type: 'START_FETCHING' })
  axiosWithAuth()
    .post(`/locate/next`, {pageToken})
    .then(response => {
      dispatch({ type: 'NEXT_PAGE_LOCATION_SUCCESS', payload: response.data.results, status: response.data.status, next_page: response.data.next_page_token, pages:response.data.results})
      history.push(`/findrestaurant${query}`)
    })
    .catch(error => {
      dispatch({ type: 'FETCH_FAILURE', payload: error.response })
    })
};

export const placeDetails = (places_id, setRestaurant) => dispatch => {
  dispatch({ type: 'START_FETCHING' })
  axiosWithAuth()
    .post('/locate/details', {places_id})
    .then(response => {
      setRestaurant(response.data.result)
      dispatch({ type: FETCH_RESTAURANT_SUCCESS, payload: response.data.result})
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error.response })
    })
}

export const resetResponseState = () => dispatch => {
  dispatch({ type: RESET_STATE })
}