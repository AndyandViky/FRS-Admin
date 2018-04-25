import {
    baseUrl
} from './env';
import axios from 'axios';
import { getToken } from '@/util/auth';
import store from '@/store';
import { Message } from 'iview';

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = baseUrl;

// POST传参序列化
axios.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
    // if (store.getters.token) {
    //     config.headers['authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWxmSWQiOjIsImlhdCI6MTUyMzMzOTQwNywiZXhwIjoxNTI0MjAzNDA3fQ.tWUoC3fCuDXOExtmdnInYd44kR-Qvjvwe9Zu8LuzkPo'; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // }
    config.headers['authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWxmSWQiOjU5NSwidHlwZSI6MiwiaWF0IjoxNTI0MjM4MTcwLCJleHAiOjE1MjUxMDIxNzB9.MmdrSIRtdXgVL3SzJ-w3U-Jg2UWMtU4OBOQkVlmwQOQ'; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    return config;
}, (error) => {
    Message.error({content: '网络错误'});
    return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use((res) => {
    if (res.data.code !== 1) {
        Message.error({content: res.data.msg});
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    Message.error({content: '网络错误'});
    return Promise.reject(error);
});

export function request (api, datas, method = 'get') {
    let params, data;
    if (method === 'get') {
        params = datas;
    } else {
        data = datas;
    }
    return new Promise((resolve, reject) => {
        axios.request({
            url: api,
            method: method,
            params: params,
            data: data
        }).then(response => {
            const res = response.data;
            resolve(res.data);
        })
            .catch((error) => {
                reject(error);
            });
    });
}
