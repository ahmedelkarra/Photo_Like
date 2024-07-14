import axios from 'axios'


const host = 'http://localhost:5000/api'

export const axiosControl = axios.create(
    {
        baseURL: `${host}/auth`,
        withCredentials: true
    }
)