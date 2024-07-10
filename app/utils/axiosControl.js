import axios from 'axios'


const host = 'http://localhost:5000'

export const axiosControl = axios.create(
    {
        baseURL: `${host}/auth`
    }
)