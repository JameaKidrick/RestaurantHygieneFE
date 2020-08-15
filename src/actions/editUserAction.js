import { axiosWithAuth } from '../utils/axiosWithAuth'

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

// export const deleteUser = () => dispatch => {

// }