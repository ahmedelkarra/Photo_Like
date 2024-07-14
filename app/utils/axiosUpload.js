import axios from 'axios'


const host = 'http://localhost:5000/api'

export const axiosUpload = axios.create(
    {
        baseURL: `${host}/photo`,
        withCredentials: true
    }
)