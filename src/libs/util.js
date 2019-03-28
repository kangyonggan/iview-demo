import axios from 'axios';
import env from '../config/env';
import Cookies from 'js-cookie'

/**
 * 令牌存放在Cookie中的key
 *
 * @type {string}
 */
export const TOKEN_KEY = '_token'

let util = {

};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:8888' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

/**
 * 设置浏览器标题
 *
 * @param title
 */
export const setTitle = (title) => {
    title = title ? title + ' - 后台管理系统' : '后台管理系统';
    window.document.title = title;
};

/**
 * 从Cookie中获取令牌
 *
 * @returns {*}
 */
export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}

export default util;