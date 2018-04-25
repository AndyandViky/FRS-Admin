import {request} from '@/util/axios.js';

// 获取用户列表
export const getUsers = (data) => request('/users', data, 'get');

// 获取用户信息
export const getUser = (data) => request('/user', data, 'get');

// 修改用户信息
export const changeUserInfo = (data) => request('/user', data, 'put');

// 删除用户
export const deleteUser = (data) => request('/user', data, 'delete');

// 获取访客记录
export const getVisitorRecord = (data) => request('/visitors', data, 'get');

// 延时访客访问天数
export const addVisiteTime = (data) => request('/visite/time', data, 'put');

// 通过业主申请
export const approveRedident = (data) => request('/resident', data, 'put');

// 打开摄像头
export const openCamera = (data) => request('/open/camera', data, 'post');

// 关闭摄像头
export const closeCamera = (data) => request('/close/camera', data, 'post');

// 获取所有摄像头
export const getAllCamera = (data) => request('/cameras', data, 'get');

export const getNotRgisterRecord = (data) => request('/camera/records', data, 'get');
