const routers = [{
    path: '/',
    meta: {
        title: '首页'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
}, {
    path: '/login',
    name: 'login',
    meta: {
        title: '用户登录'
    },
    component: (resolve) => require(['./views/login.vue'], resolve)
}];
export default routers;