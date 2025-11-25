import axios from 'axios';

const API = axios.create({
    baseURL: 'https://primetradeai-production.up.railway.app/api',
});

// Add a request interceptor to attach the token
API.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
