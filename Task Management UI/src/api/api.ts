import type { AxiosResponse } from 'axios';
import axiosInstance from './apiConfig';

export const get = async <T, F = unknown>(
  url: string,
  params?: F,
  publicUrl?: string
// eslint-disable-next-line complexity
): Promise<AxiosResponse<T>> => {
  if (!params && !publicUrl) {
    return await axiosInstance.get(url);
  }

  const config = {
    ...(params && { params }),
    ...(publicUrl && { baseURL: publicUrl, headers: { Authorization: undefined } })
  };
  return await axiosInstance.get(url, config);
};

export const post = async <T, R>(url: string, body: T): Promise<AxiosResponse<R>> => {
  return await axiosInstance.post(url, body);
};

export const patch = async <T, R>(url: string, body: T): Promise<AxiosResponse<R>> => {
  return await axiosInstance.patch(url, body);
};

export const deleteFn = async <R>(url: string): Promise<AxiosResponse<R>> => {
  return await axiosInstance.delete(url);
};

export const put = async <T, R>(url: string, body: T): Promise<AxiosResponse<R>> => {
  return await axiosInstance.put(url, body);
};
