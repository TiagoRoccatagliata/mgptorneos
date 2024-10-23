import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/';

const AxiosInstance = axios.create({
    baseURL: baseUrl,  // Corregido a 'baseURL'
    timeout: 5000,
    headers: {  // Corregido a 'headers'
        "Content-Type": "application/json",
        accept: "application/json",
    }
});

export default AxiosInstance;