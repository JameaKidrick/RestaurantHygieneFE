import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
export const FETCH_USER_REVIEWS_SUCCESS = 'FETCH_USER_REVIEWS_SUCCESS';
export const RESET_REVIEWS_STATE = 'RESET_REVIEWS_STATE';

// ACTION CREATORS
export const getReviewsByRestaurantID = (restaurant_id) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .get(`/reviews/restaurant/${restaurant_id}`)
    .then(response => {
      dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error })
    })
}

export const getReviewsByUserID = (user_id) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .get(`/reviews/user/${user_id}`)
    .then(response => {
      dispatch({ type: FETCH_USER_REVIEWS_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error })
    })
}

export const getRestaurantByPlaceID = (place_id) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .get(`/restaurants/place/${place_id}`)
    .then(response => {
      dispatch({ type: FETCH_RESTAURANTS_SUCCESS, place_id, restaurant_id: response.data.restaurant_id })
      if(response.data.restaurant_id !== undefined){
        dispatch(getReviewsByRestaurantID(response.data.restaurant_id))
      }else{
        dispatch(resetReviewsState())
      }
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error })
    })
}

export const addReview = (place_id, review, restaurant_id, setNewReview, setCreating) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .post(`/reviews/restaurant/${place_id}`, review)
    .then(response => {
      dispatch({ type: ADD_REVIEW_SUCCESS })
      dispatch(getReviewsByRestaurantID(response.data.review.restaurant_id))
      setNewReview({
        rating: 0,
        review: ''
      })
      setCreating(false)
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error })
    })
}

export const editReviewAction = (review_id, changes, restaurant_id, setEditing, user_id) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .put(`/reviews/${review_id}`, changes)
    .then(response => {
      setEditing(false)
      if(user_id){
        dispatch(getReviewsByUserID(user_id))
      }else{
        dispatch(getReviewsByRestaurantID(restaurant_id))
      }
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error })
    })
}

export const deleteReview = (review_id, restaurant_id, setDeleting, user_id) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .delete(`/reviews/${review_id}`)
    .then(response => {
      setDeleting(false)
      if(user_id){
        dispatch(getReviewsByUserID(user_id))
      }else{
        dispatch(getReviewsByRestaurantID(restaurant_id))
      }
      // dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: response.data })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error })
    })
}

export const resetReviewsState = () => dispatch => {
  dispatch({ type: RESET_REVIEWS_STATE })
}