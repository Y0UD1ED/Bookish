import axios from 'axios'

export const API_URL='http://localhost:8080'

const $api=axios.create({
    withCredentials:true,
    baseURL: API_URL
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization=`Bearer ${localStorage.getItem('access_token')}`
    return config
})

$api.interceptors.response.use((config)=>{
    return config;
}, async(error)=>{
    const originalRequest=error.config;
    if(error.response.status==401&&error.config&&!error.config._isRetry){
        originalRequest._isRetry=true;
        try{
            const response=await axios.get(`${API_URL}/auth/refresh`,{withCredentials:true})
            localStorage.setItem('access_token',response.data.accessToken);
            return $api.request(originalRequest);
        }catch(e){
            console.log('Не авторизован')
        }
        
    }
    throw error;
})

export default $api;