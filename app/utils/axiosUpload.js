import axios from 'axios'


const host = 'https://photo-like-server.onrender.com/api'

export const axiosUpload = axios.create(
    {
        baseURL: `${host}/photo`,
        withCredentials: true
    }
)