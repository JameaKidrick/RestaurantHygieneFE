import { axiosWithAuth } from "../utils/axiosWithAuth";

// ACTION TYPES
export const START_FETCHING = "START_FETCHING";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

// ACTION CREATORS
export const registerUser = (data, history) => (dispatch) => {
  dispatch({ type: START_FETCHING });
  axiosWithAuth()
    .post("/auth/register", data)
    .then((response) => {
      dispatch({ type: REGISTER_SUCCESS, payload: response.data.user_id });
      localStorage.setItem("token", response.data.token);
      history.push("/");
    })
    .catch((error) => {
      dispatch({ type: FETCH_FAILURE, payload: error.response.data.error });
    });
};
