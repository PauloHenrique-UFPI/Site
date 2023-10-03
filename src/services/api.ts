import axios from 'axios';

const api = axios.create(
  {
    baseURL: 'https://pokeapi.co/api/v2/',
  },
);

export default api;

/*
import axios, { AxiosInstance } from 'axios';

const api = axios.create(
  {
    baseURL: "https://api-koch.onrender.com",
  },
);

export default api;

*/
