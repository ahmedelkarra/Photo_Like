import axios from 'axios'


const host = 'https://photo-like-server-dcae478b8a90.herokuapp.com/api'

export const axiosUpload = axios.create(
    {
        baseURL: `${host}/photo`,
        withCredentials: true
    }
)