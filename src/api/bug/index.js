import {request} from '@/util/axios.js';

// 处理故障
export const operatedBug = (data) => request('/bug', data, 'put');

// 获取故障列表
export const getBugs = (data) => request('/bugs', data, 'get');

// 获取故障详情
export const getBug = (data) => request('/bug', data, 'get');