// AxiosInstance.js
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/'; // Verifica que sea la URL correcta de tu backend

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Interceptor de solicitud para agregar el token de autenticación
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta para manejar errores de autenticación
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Elimina el token si la autenticación falla
      localStorage.removeItem('Token');
      console.warn("No autorizado. Por favor, inicia sesión nuevamente.");
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;