import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING';
export const LOCATION_SUCCESS = 'LOCATION_SUCCESS';
export const NEXT_PAGE_LOCATION_SUCCESS = 'NEXT_PAGE_LOCATION_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

// ACTION CREATORS
export const placeLocator = (parameters) => dispatch => {
  dispatch({ type: 'START_FETCHING' })
  axiosWithAuth()
    .post(`/locate`, parameters)
    .then(response => {
      dispatch({ type: 'LOCATION_SUCCESS', payload: response.data.results, status: response.data.status, next_page: response.data.next_page_token, pages:response.data.results, pageNumber: 'page1'})
    })
    .catch(error => {
      dispatch({ type: 'FETCH_FAILURE', payload: error.response })
    })
};

export const placeLocator_nextPage = (pageToken) => dispatch => {
  dispatch({ type: 'START_FETCHING' })
  axiosWithAuth()
    .post(`/locate/next`, {pageToken})
    .then(response => {
      dispatch({ type: 'NEXT_PAGE_LOCATION_SUCCESS', payload: response.data.results, status: response.data.status, next_page: response.data.next_page_token, pages:response.data.results})
    })
    .catch(error => {
      dispatch({ type: 'FETCH_FAILURE', payload: error.response })
    })
};