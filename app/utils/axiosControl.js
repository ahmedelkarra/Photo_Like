import axios from 'axios'


const host = 'https://photo-like-server-dcae478b8a90.herokuapp.com/api'

export const axiosControl = axios.create(
    {
        baseURL: `${host}/auth`,
        withCredentials: true
    }
)