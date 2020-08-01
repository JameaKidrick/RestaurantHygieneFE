import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';

// ACTION CREATORS
export const getReviewsByRestaurantID = (restaurant_id) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .get(`/reviews/restaurant/${restaurant_id}`)
    .then(response => {
      console.log(response)
      dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: response.data })
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: FETCH_FAILURE, payload: error })
    })
}

export const getRestaurantByPlaceID = (place_id) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .get(`/restaurants/place/${place_id}`)
    .then(response => {
      console.log(response)
      dispatch({ type: FETCH_RESTAURANTS_SUCCESS, place_id, restaurant_id: response.data.restaurant_id })
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: FETCH_FAILURE, payload: error })
    })
}

export const addReview = (place_id, review, restaurant_id, setNewReview) => dispatch => {
  dispatch({ type: START_FETCHING })
  console.log('ACTION', place_id, review, restaurant_id, setNewReview)
  axiosWithAuth()
    .post(`/reviews/restaurant/${place_id}`, review)
    .then(response => {
      console.log(response)
      dispatch({ type: ADD_REVIEW_SUCCESS })
      dispatch(getReviewsByRestaurantID(restaurant_id))
      setNewReview({
        rating: 0,
        review: ''
      })
    })
    .catch(error => {
      console.log('ERROR', error)
      dispatch({ type: FETCH_FAILURE, payload: error })
    })
}

export const editReviewAction = (review_id, changes, restaurant_id, setEditing) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .put(`/reviews/${review_id}`, changes)
    .then(response => {
      console.log(response)
      setEditing(false)
      dispatch(getReviewsByRestaurantID(restaurant_id))
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: FETCH_FAILURE, payload: error })
    })
}

export const deleteReview = (review_id, restaurant_id, setDeleting) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .delete(`/reviews/${review_id}`)
    .then(response => {
      console.log(response)
      setDeleting(false)
      dispatch(getReviewsByRestaurantID(restaurant_id))
      // dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: response.data })
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: FETCH_FAILURE, payload: error })
    })
}