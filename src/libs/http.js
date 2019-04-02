import Axios from './axios';

const axios = new Axios();
const http = {};

// http请求
http.request = function (method, url, data) {
    return new Promise((resolve, reject) => {
        axios.http(method, url, data).then(data => {
            resolve(data);
        }).catch(data => {
            httpReject(reject, data);
        });
    });
};

// GET请求
http.get = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.get(url, data).then(data => {
            resolve(data);
        }).catch(data => {
            httpReject(reject, data);
        });
    });
};

// POST请求
http.post = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(data => {
            resolve(data);
        }).catch(data => {
            httpReject(reject, data);
        });
    });
};

// PUT请求
http.put = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(data => {
            resolve(data);
        }).catch(data => {
            httpReject(reject, data);
        });
    });
};

// 文件上传POST请求
http.postUpload = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.postUpload(url, data).then(data => {
            resolve(data);
        }).catch(data => {
            httpReject(reject, data);
        });
    });
};

// 文件上传PUT请求
http.putUpload = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.putUpload(url, data).then(data => {
            resolve(data);
        }).catch(data => {
            httpReject(reject, data);
        });
    });
};

// DELETE请求
http.del = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data).then(data => {
            resolve(data);
        }).catch(data => {
            httpReject(reject, data);
        });
    });
};

/**
 * 处理错误响应
 *
 * @param reject
 * @param data
 */
function httpReject(reject, data) {
    if (data.respCo === '9998') {
        // 登录失效

    } else if (data.respCo === '9997') {
        // 权限不足

    } else {
        // 未知错误

    }
    reject(data.respMsg);
}

export default http;
