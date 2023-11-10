import axios from 'axios'

export const useAxios = () => {
  const config = useRuntimeConfig()

  const baseURL = config.public.API_URL

  const cookie = useCookie('auth:token')

  const apiClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  // Adding the interceptor
  apiClient.interceptors.request.use((config) => {
    const cookie = useCookie('auth:token');
    const authToken = cookie.value;

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  }, (error) => {
    // Handle the request error here
    return Promise.reject(error);
  });

  return apiClient
}