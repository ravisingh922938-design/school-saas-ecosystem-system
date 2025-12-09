import axios from 'axios';

// 1. Backend URL set karna (Cloud vs Local)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// 2. Axios Instance Banana
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 3. Token Interceptor (Automatic Token bhejna)
// Jab bhi API call hogi, ye check karega ki LocalStorage mein token hai ya nahi.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;