import { axiosWithAuth } from '../utils/axiosWithAuth'

// ACTIONS
import { logOutUser, resetResponseState } from '../actions'

// ACTION TYPES
export const START_FETCHING = 'START_FETCHING'
export const FETCH_FAILURE = 'FETCH_FAILURE'
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'

// ACTION CREATORS
export const editUser = (user_id, changes, setSuccess) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .put(`/users/${user_id}`, changes)
    .then(response => {
      setSuccess(true)
      dispatch({ type: EDIT_USER_SUCCESS })
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE })
    })
}

export const deleteUser = (user_id, setDeleting, persistor, history) => dispatch => {
  dispatch({ type: START_FETCHING })
  axiosWithAuth()
    .delete(`/users/${user_id}`)
    .then(response => {
      dispatch({ type: DELETE_USER_SUCCESS })
      setDeleting(false)
      dispatch(logOutUser(persistor, resetResponseState))
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE })
    })
}