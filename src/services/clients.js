import axios from 'axios';

export const client = (() => {
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
  });
})();

export const clientUsers = (() => {
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_API_USERS_URL,
  });
})();

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

clientUsers.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
