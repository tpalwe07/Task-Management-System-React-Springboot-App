import axiosInstance from '../api/apiConfig';

const TOKEN_KEY = 'jwt_token';
const REFRESH_TOKEN_KEY = 'refresh_token';


export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', { username, password });
  const token = response.data?.data?.accessToken;
  const refreshToken = response.data?.data?.refreshToken;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};
