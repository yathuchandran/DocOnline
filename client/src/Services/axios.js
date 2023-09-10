import axios from 'axios'
import {baseUrl }from '../components/constants/Constants'
const instance =axios.create({
    baseURL: baseUrl,
})



axios.interceptors.request.use(
    (config) => {
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
            config.headers['Authorization'] = `Bearer ${userToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



axios.interceptors.request.use(
    (config) => {
        const doctorToken = localStorage.getItem('doctorToken');
        if (doctorToken) {
            config.headers['Authorization'] = `Bearer ${doctorToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.request.use(
    (config) => {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            config.headers['Authorization'] = `Bearer ${adminToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default instance




