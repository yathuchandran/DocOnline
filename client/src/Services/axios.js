import axios from 'axios'
import {baseUrl }from '../components/constants/Constants'
const instance =axios.create({
    baseURL: baseUrl,
})

instance.interceptors.request.use(
    (config) => {
      const userToken = localStorage.getItem('userToken');
      const doctorToken = localStorage.getItem('doctorToken');
      const adminToken = localStorage.getItem('adminToken');
  
      if (userToken) {
        config.headers['Authorization'] = `Bearer ${userToken}`;
      } else if (doctorToken) {
        config.headers['Authorization'] = `Bearer ${doctorToken}`;
      } else if (adminToken) {
        config.headers['Authorization'] = `Bearer ${adminToken}`;
      }
      
      return config; // Don't forget to return the modified config
    },
    (error) => {
      return Promise.reject(error);
    }
  );



export default instance




