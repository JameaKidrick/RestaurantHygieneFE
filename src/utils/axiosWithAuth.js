import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'http://localhost:5555/api',
    headers: {
      Authorization: token
    }
  })
}

// http://localhost:5555/api
// https://restaurant-hygiene.herokuapp.com/api