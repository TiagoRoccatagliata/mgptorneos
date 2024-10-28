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

//Utiliza Token que verifica si estas logueado para hacer una request

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token')

        if(token){
            config.headers.Authorization = `Token ${token}`
        }
        else{
            config.headers.Authorization = `` //Si no hay token, envia Null 
        }
        return config;
    } 
    
)


AxiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    //Si no tengo token o ya no sirve, te envia al login
    (error) => {
        if (error.response && error.response.status === 401){
            localStorage.removeItem(`Token`)
            window.location.href = '/' 
        } 
    }
)

export default AxiosInstance;