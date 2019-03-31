import Mock from 'mockjs'
import {login, logout, loginData} from './login'

// 登录相关和获取用户信息
Mock.mock('/login', 'POST', login);
Mock.mock('/login/data', 'GET', loginData);
Mock.mock('/logout', 'GET', logout);

export default Mock;
