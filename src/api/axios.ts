import { API_URL } from '@/constants/api.constants';
import { EnumTokens } from '@/constants/auth.constants';
import type { CreateAxiosDefaults } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';
import { errorCatch } from './api.helper';
import { authService } from '@/services/auth.services';

const options: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const axiosClassic = axios.create(options);

export const instance = axios.create(options);

instance.interceptors.request.use((config) => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originRequest = error.config;
    if (
      (error?.response?.status == 401 ||
        errorCatch(error) == 'jwt expired' ||
        errorCatch(error) == 'jwt must be provided') &&
      originRequest &&
      !originRequest._isRetry
    ) {
      originRequest._isRetry = true;
      try {
        await authService.getNewTokens();
        return instance.request(originRequest);
      } catch (error) {
        if (errorCatch(error) == 'jwt expired' || errorCatch(error) == 'jwt must be provided') {
          authService.removeFromStorage();
          throw error;
        }
      }
    }
    throw error;
  },
);
