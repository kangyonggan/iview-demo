import Axios from './axios';
import Util from './util';

const axios = new Axios();

const http = {};

// http请求
http.request = function (method, url, data) {
    return new Promise((resolve, reject) => {
        axios.http(method, url, data).then(data => {
            resolve(data);
        }).catch(respCo => {
            reject(respCo);
            if (respCo === '9998') {
                Util.removeToken();
            }
        });
    });
};

// GET请求
http.get = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.get(url, data).then(data => {
            resolve(data);
        }).catch(respCo => {
            reject(respCo);
            if (respCo === '9998') {
                Util.removeToken();
            }
        });
    });
};

// POST请求
http.post = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(data => {
            resolve(data);
        }).catch(respCo => {
            reject(respCo);
            if (respCo === '9998') {
                Util.removeToken();
            }
        });
    });
};

// PUT请求
http.put = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(data => {
            resolve(data);
        }).catch(respCo => {
            reject(respCo);
            if (respCo === '9998') {
                Util.removeToken();
            }
        });
    });
};

// 文件上传POST请求
http.postUpload = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.postUpload(url, data).then(data => {
            resolve(data);
        }).catch(respCo => {
            reject(respCo);
            if (respCo === '9998') {
                Util.removeToken();
            }
        });
    });
};

// 文件上传PUT请求
http.putUpload = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.putUpload(url, data).then(data => {
            resolve(data);
        }).catch(respCo => {
            reject(respCo);
            if (respCo === '9998') {
                Util.removeToken();
            }
        });
    });
};

// DELETE请求
http.del = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data).then(data => {
            resolve(data);
        }).catch(respCo => {
            reject(respCo);
            if (respCo === '9998') {
                Util.removeToken();
            }
        });
    });
};

export default http;
