import axios from 'axios';
import qs from 'qs';
import { message } from 'element-ui';
import router from '@/router';
import apiConfig from './apiConfig';

const instance = axios.create({ baseURL: apiConfig.baseURL });

const fetch = (url, method = 'get', data = {}) => {
    const AUTH_TOKEN = window.localStorage.getItem('adminUser');
    if (AUTH_TOKEN) instance.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
    switch (method) {
    case 'get':
        return instance.get(url, { params: data });
    case 'post':
        return instance.post(url, qs.stringify(data));
    default:
        return instance.get(url, { params: data });
    }
};

function request(url, method, data) {
    return fetch(url, method, data).then((res) => {
        if (res.data.code === '00003') {
            setTimeout(() => {
                router.replace('/signin');
            }, 0);
            return res;
        }
        if (res.data.code !== '00001') {
            message({
                message: res.data.msg,
                type: 'warning',
            });
        }
        return res;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}

export default request;
