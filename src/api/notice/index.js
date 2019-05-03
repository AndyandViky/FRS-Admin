import {request} from '@/util/axios.js';

// 获取所有通知
export const getNotices = (data) => request('/notices', data, 'get');

// 获取通知详情
export const getNotice = (data) => request('/notice', data, 'get');

// 更改通知状态
export const noticed = (data) => request('/notice', data, 'put');
