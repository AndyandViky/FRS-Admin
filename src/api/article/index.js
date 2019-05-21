import {request} from '@/util/axios.js';

// 获取所有文章
export const getArticles = (data) => request('/articles', data, 'get');

// 发布文章
export const addArticle = (data) => request('/article', data, 'post');

// 修改文章信息
export const changeArticleInfo = (data) => request('/article', data, 'put');

// 获取文章详情
export const getArticle = (data) => request('/article', data, 'get');

// 删除文章
export const deleteArticle = (data) => request('/article', data, 'delete');
