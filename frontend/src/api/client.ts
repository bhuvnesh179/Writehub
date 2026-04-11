import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { BACKEND_URL } from "../config";
import { getAuthToken } from "../lib/auth";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
});

const attachAuthHeader = (config: InternalAxiosRequestConfig) => {
  const token = getAuthToken();

  if (token) {
    config.headers.set("Authorization", token);
  }

  return config;
};

apiClient.interceptors.request.use(attachAuthHeader);

export default apiClient;