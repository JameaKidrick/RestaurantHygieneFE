import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING';
export const LOCATION_SUCCESS = 'LOCATION_SUCCESS';
export const NEXT_PAGE_LOCATION_SUCCESS = 'NEXT_PAGE_LOCATION_SUCCESS';
export const CURRENT_PAGE = 'CURRENT_PAGE';
export const GET_RESTAURANT = 'CURRENT_PAGE';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const RESET_GOOGLE_STATE = 'RESET_GOOGLE_STATE';

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
  console.log('ACTION', query)
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

export const placeDetails = (places_id) => dispatch => {
  dispatch({ type: 'START_FETCHING' })
  axiosWithAuth()
    .post('/locate/details', {places_id})
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}

// ACTION CREATORS
export const resetResponseState = () => dispatch => {
  dispatch({ type: RESET_GOOGLE_STATE })
}