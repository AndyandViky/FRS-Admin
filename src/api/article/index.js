import {request} from '@/util/axios.js';

// 获取所有文章
export const getArticles = (data) => request('/articles', data, 'get');

// 发布文章
export const addArticle = (data) => request('/article', data, 'post');
