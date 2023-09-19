import axios from 'axios'
import {baseUrl }from '../components/constants/Constants'
const instance =axios.create({
    baseURL: baseUrl,
})

const setAuthorizationHeader = (config) => {
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

    return config;
};

axios.interceptors.request.use(
    setAuthorizationHeader,
    (error) => {
        return Promise.reject(error);
    }
);


export default instance




