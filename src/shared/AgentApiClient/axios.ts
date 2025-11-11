import axios from 'axios';

import { AGENT_API_URL } from 'shared/config/urls';


export const axiosInstance = axios.create({
  baseURL: AGENT_API_URL,
});
