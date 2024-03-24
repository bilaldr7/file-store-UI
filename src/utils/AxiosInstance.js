import axios from 'axios';
import AuthService from '../services/authService';
// const axiosInstance = axios.create();
const axiosInstance = axios.create({
  withCredentials:true,
  headers:{'Access-Control-Allow-Origin':'*'}
});
// axiosInstance.defaults.maxRedirects = 0; // Set to 0 to prevent automatic redirects
// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && [301, 302].includes(error.response.status)) {
//       const redirectUrl = error.response.headers.location;
//       return axiosInstance.get(redirectUrl);
//     }
//     return Promise.reject(error);
//   }
// );
axiosInstance.interceptors.request.use(
  async (config) => {
    if (AuthService.isLoggedIn()) {
      const token = AuthService.getToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  });
  

export default axiosInstance;