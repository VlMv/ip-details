import axios from 'axios';

import { API_URL } from 'shared/config/urls';


export const axiosInstance = axios.create({
  baseURL: API_URL,
});
