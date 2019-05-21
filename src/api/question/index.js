import {request} from '@/util/axios.js';

// 获取问题列表
export const getQuestions = (data) => request('/questions', data, 'get');

// 获取问题详情
export const getQuestion = (data) => request('/question', data, 'get');

// 修改问题内容
export const changeQuestion = (data) => request('/question', data, 'put');

// 修改答案内容
export const changeAnswer = (data) => request('/answer', data, 'put');

// 删除问题内容
export const deleteQuestion = (data) => request('/question', data, 'delete');

// 删除回答内容
export const deleteAnswer = (data) => request('/answer', data, 'delete');

// 增加回答
export const addQuestion = (data) => request('/question', data, 'post');

// 增加答案
export const addAnswer = (data) => request('/answer', data, 'post');
