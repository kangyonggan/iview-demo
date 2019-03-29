import Cookies from 'js-cookie'

let util = {};

/**
 * 令牌存放在Cookie中的key
 *
 * @type {string}
 */
util.tokenKey = 'x-auth-token';

/**
 * 设置浏览器标题
 *
 * @param title
 */
util.title = function (title) {
    title = title ? title + ' - 后台管理系统' : '后台管理系统';
    window.document.title = title;
};

/**
 * 从Cookie中获取令牌
 *
 * @returns {*}
 */
util.token = function () {
    const token = Cookies.get(this.tokenKey);
    if (token) {
        return token;
    }
    return false;
};

/**
 * 从Cookie中移除令牌
 */
util.removeToken = function () {
    Cookies.set(this.tokenKey, '', {expires: -1})
};

/**
 * 向Cookie中添加令牌
 */
util.setToken = function (token) {
    Cookies.set(this.tokenKey, token, {expires: 30})
};

/**
 * 把请求？后面的封装成对象
 *
 * @param url
 * @returns {{}}
 */
util.params = function (url) {
    if (url.indexOf('?') === -1) {
        return {};
    }
    const keyValueArr = url.split('?')[1].split('&');
    let paramObj = {};
    keyValueArr.forEach(item => {
        const keyValue = item.split('=');
        paramObj[keyValue[0]] = keyValue[1];
    });
    return paramObj;
};

export default util;