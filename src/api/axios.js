import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
});

export const controller = new AbortController();

export default axiosInstance;
