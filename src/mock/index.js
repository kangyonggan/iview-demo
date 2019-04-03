import Mock from 'mockjs'
import {login, logout, loginData} from './login'

// 登录相关和获取用户信息
Mock.mock(/\/login\/data/, loginData);
Mock.mock(/\/logout/, logout);
Mock.mock(/\/login/, function (ops) {
    console.log(ops);
});

export default Mock;
