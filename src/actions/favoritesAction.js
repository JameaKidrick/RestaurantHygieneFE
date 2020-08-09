import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING'
export const FETCH_FAILURE = 'FETCH_FAILURE'
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS'
export const ADD_FAVORITE_SUCCESS = 'ADD_FAVORITE_SUCCESS'
export const DELETE_FAVORITE_SUCCESS = 'DELETE_FAVORITE_SUCCESS'
export const RESET_USER_DATA = 'RESET_USER_DATA'

// ACTION CREATORS
export const getAllFavoritesByUserID = (user_id) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .get(`/favorites/user/${user_id}`)
    .then(response => {
      console.log(response)
      dispatch({ type: FETCH_FAVORITES_SUCCESS, payload: response.data })
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: FETCH_FAILURE })
    })
}

export const addNewFavorite = (favorite, user_id) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .post(`/favorites`, favorite)
    .then(response => {
      console.log(response)
      dispatch({ type: ADD_FAVORITE_SUCCESS })
      dispatch(getAllFavoritesByUserID(user_id))
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: FETCH_FAILURE })
    })
}

export const deleteFavorite = (favorite_id, setDeleting, user_id) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .delete(`/favorites/${favorite_id}`)
    .then(response => {
      console.log(response)
      dispatch({ type: DELETE_FAVORITE_SUCCESS })
      dispatch(getAllFavoritesByUserID(user_id))
      setDeleting(false)
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: FETCH_FAILURE })
    })
}

export const resetUserData = () => dispatch => {
  dispatch({ type: START_FETCHING })
  dispatch({ type: RESET_USER_DATA })
}