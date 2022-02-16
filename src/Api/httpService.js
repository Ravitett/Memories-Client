import axios from 'axios'
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:3006/';
const TOKEN = localStorage.getItem("memories-token") || '';

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'get', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            headers:{autorisation:TOKEN},
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`)
        if (err.response && err.response.status === 401) {
            toast.error("אין הרשאה לפעולה זו")
        }else{
            toast.error("שגיאת מערכת, נא לפנות למנהל המערכת.")
        }
        throw err
    }
}