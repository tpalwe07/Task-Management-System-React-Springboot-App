import axios from 'axios';

const version = 'v1';

// Base URL
const BASE_URL = `http://localhost:8080/${version}/api`;

// Creating Axios Instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export default axiosInstance;
