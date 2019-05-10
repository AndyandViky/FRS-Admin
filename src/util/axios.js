import {
    baseUrl
} from './env';
import axios from 'axios';
import { getToken } from '@/util/auth';
import { Message, Spin } from 'iview';

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = baseUrl;

// POST传参序列化
axios.interceptors.request.use((config) => {
    Spin.show({
        render: (h) => {
            return h('div', [
                h('Icon', {
                    'class': 'demo-spin-icon-load',
                    props: {
                        type: 'load-c',
                        size: 18
                    }
                }),
                h('div', '加载中...')
            ]);
        }
    });
    config.headers['Content-Type'] = 'application/json';
    config.headers['authorization'] = 'Bearer ' + getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    return config;
}, (error) => {
    setTimeout(() => {
        Spin.hide();
    }, 1000);
    Message.error({content: '网络错误'});
    return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use((res) => {
    setTimeout(() => {
        Spin.hide();
    }, 1000);
    if (res.data.code !== 1) {
        Message.error({content: res.data.msg});
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    setTimeout(() => {
        Spin.hide();
    }, 1000);
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
