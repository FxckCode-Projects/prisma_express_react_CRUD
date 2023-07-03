import axios from 'axios';

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:3500/api"
})

axiosClient.interceptors.request.use((config) => {
    config.headers['Content-Type'] = "application/json"
    return config
})

axiosClient.interceptors.response.use((response) => {
    return response
})

export default axiosClient