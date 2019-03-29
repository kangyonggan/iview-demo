const routers = [{
    path: '/',
    name: 'index',
    redirect: '/home',
    component: (resolve) => require(['./views/main/main.vue'], resolve),
    children: [
        {
            path: 'home',
            name: 'home',
            component: (resolve) => require(['./views/home/home.vue'], resolve)
        }
    ]
}, {
    path: '/login',
    name: 'login',
    meta: {
        title: '用户登录'
    },
    component: (resolve) => require(['./views/login.vue'], resolve)
}];
export default routers;
