import axios from 'axios';
import apiConfig from '@/api/apiConfig';


const instance = axios.create({
    baseURL: apiConfig.baseURL,
});

const AUTH_TOKEN = window.localStorage.getItem('zyUser');
if (AUTH_TOKEN) instance.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;

export default function (url, data) {
    return instance.post(url, data);
}
