import axios from 'axios';
import { getRefreshToken, logout } from '../services/auth';

const version = 'v1';

// Base URL
const BASE_URL = `http://localhost:8080/${version}/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }

);

let isRefreshing = false;
type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
};
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      if (token !== null) {
        prom.resolve(token);
      }
    }
  });
  failedQueue = [];
};

type OriginalRequest = {
  headers: { [key: string]: string };
  _retry?: boolean;
  url?: string;
  [key: string]: unknown;
};

const getNewAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token');
  const { accessToken } = await requestNewToken(refreshToken);
  if (!accessToken) throw new Error('No access token in refresh response');
  localStorage.setItem('jwt_token', accessToken);
  return accessToken;
};

type RefreshResponse = {
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };
};

const refreshClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// eslint-disable-next-line complexity
const requestNewToken = async (refreshToken: string): Promise<{ accessToken?: string; refreshToken?: string }> => {
  const res = await refreshClient.post<RefreshResponse>('/auth/refresh', { refreshToken });
  const accessToken = res.data?.data?.accessToken;
  const newRefreshToken = res.data?.data?.refreshToken;
  if (newRefreshToken) {
    localStorage.setItem('refresh_token', newRefreshToken);
  }
  return { accessToken, refreshToken: newRefreshToken };
};

const handleRefreshToken = async (originalRequest: OriginalRequest) => {
  try {
    const newToken = await getNewAccessToken();
    processQueue(null, newToken);
    isRefreshing = false;
    originalRequest.headers.Authorization = `Bearer ${newToken}`;
    return axiosInstance(originalRequest);
  } catch (err) {
    processQueue(err, null);
    isRefreshing = false;
    logout();
    window.location.href = '/login';
    return Promise.reject(err);
  }
};

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest: OriginalRequest = error.config;
    if (shouldAttemptRefresh(error, originalRequest)) {
      return handle401Error(originalRequest);
    }
    return Promise.reject(error);
  }
);

// eslint-disable-next-line complexity
const isAuthRequest = (originalRequest: OriginalRequest): boolean => {
  const url = originalRequest.url ?? '';
  return url.includes('/auth/login') || url.includes('/auth/refresh') || url.includes('/auth/register');
};

// eslint-disable-next-line complexity
const shouldAttemptRefresh = (error: unknown, originalRequest: OriginalRequest): boolean => {
  const err = error as { response?: { status?: number } };
  const hasRefreshToken = !!getRefreshToken();
  return err.response?.status === 401 && !originalRequest._retry && !isAuthRequest(originalRequest) && hasRefreshToken;
};

const handle401Error = (originalRequest: OriginalRequest) => {
  originalRequest._retry = true;
  if (!isRefreshing) {
    isRefreshing = true;
    return handleRefreshToken(originalRequest);
  }
  return new Promise(function (resolve, reject) {
    failedQueue.push({
      resolve: (token: string) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        resolve(axiosInstance(originalRequest));
      },
      reject: (err: unknown) => {
        reject(err);
      }
    });
  });
};

export default axiosInstance;
