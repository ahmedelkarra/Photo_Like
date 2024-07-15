import axios from 'axios'


const host = 'https://photo-like-server.onrender.com/api'

export const axiosControl = axios.create(
    {
        baseURL: `${host}/auth`,
        withCredentials: true
    }
)