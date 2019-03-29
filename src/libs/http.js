import Axios from './axios';

const axios = new Axios();

const http = {};

// http请求
http.request = function (method, url, data) {
    return new Promise((resolve, reject) => {
        axios.http(method, url, data).then(data => {
            resolve(data);
        }).catch(respMsg => {
            reject(respMsg);
        });
    });
};

// GET请求
http.get = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.get(url, data).then(data => {
            resolve(data);
        }).catch(respMsg => {
            reject(respMsg);
        });
    });
};

// POST请求
http.post = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(data => {
            resolve(data);
        }).catch(respMsg => {
            reject(respMsg);
        });
    });
};

// PUT请求
http.put = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(data => {
            resolve(data);
        }).catch(respMsg => {
            reject(respMsg);
        });
    });
};

// 文件上传POST请求
http.postUpload = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.postUpload(url, data).then(data => {
            resolve(data);
        }).catch(respMsg => {
            reject(respMsg);
        });
    });
};

// 文件上传PUT请求
http.putUpload = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.putUpload(url, data).then(data => {
            resolve(data);
        }).catch(respMsg => {
            reject(respMsg);
        });
    });
};

// DELETE请求
http.del = function (url, data) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data).then(data => {
            resolve(data);
        }).catch(respMsg => {
            reject(respMsg);
        });
    });
};

export default http;
