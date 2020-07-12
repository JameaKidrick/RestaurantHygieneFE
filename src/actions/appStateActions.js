
// ACTION TYPES
export const RESET = 'RESET';

// ACTION CREATORS
export const resetErrors = () => dispatch => {
  dispatch({ type: RESET })
}