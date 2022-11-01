import axios from 'axios';

const baseUrl = 'http://localhost:3001/users';

export const listUsers = () => {
  return axios.get(baseUrl)
}
