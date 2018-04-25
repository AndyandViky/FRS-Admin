import {request} from '@/util/axios.js';

// 获取用户列表
export const getUsers = (data) => request('/users', data, 'get');

// 获取用户信息
export const getUser = (data) => request('/user', data, 'get');

// 通过业主申请
export const approveRedident = (data) => request('/resident', data, 'put');

// 打开摄像头
export const openCamera = (data) => request('/open/camera', data, 'post');

// 关闭摄像头
export const closeCamera = (data) => request('/close/camera', data, 'post');

// 获取所有摄像头
export const getAllCamera = (data) => request('/cameras', data, 'get');

export const getNotRgisterRecord = (data) => request('/camera/records', data, 'get');
