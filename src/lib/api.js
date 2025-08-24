import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com", // swap to your real API later
});

// If you want to auto-attach token after login:
export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
};

export default api;
