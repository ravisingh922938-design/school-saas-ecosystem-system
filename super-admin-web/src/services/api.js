import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchStats = () => API.get('/dashboard/stats');
export const fetchTenants = (queryParams) => API.get('/tenants', { params: queryParams });
export const createTenant = (newTenant) => API.post('/tenants', newTenant);
export const toggleTenantStatus = (id) => API.patch(`/tenants/${id}/status`);
export const deleteTenant = (id) => API.delete(`/tenants/${id}`);
export const login = (credentials) => API.post('/users/login', credentials); // Assuming a /users/login endpoint for authentication
