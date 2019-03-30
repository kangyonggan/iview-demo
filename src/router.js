function main(resolve) {
    return require(['./views/main/main.vue'], resolve);
}

const routers = [{
    path: '/',
    name: 'index',
    redirect: '/home',
    component: (resolve) => main(resolve),
    children: [
        {
            path: 'home',
            name: 'home',
            component: (resolve) => require(['./views/home/home.vue'], resolve)
        }
    ]
}, {
    path: 'login',
    name: 'login',
    meta: {
        title: '用户登录'
    },
    component: (resolve) => require(['./views/login.vue'], resolve)
}, {
    path: '/locking',
    name: 'locking',
    component: (resolve) => require(['./views/main/components/locking.vue'], resolve)
}, {
    path: '/system',
    name: 'SYSTEM',
    component: (resolve) => main(resolve),
    children: [
        {
            path: 'user',
            name: 'SYSTEM_USER',
            component: (resolve) => require(['./views/system/user.vue'], resolve)
        },
        {
            path: 'role',
            name: 'SYSTEM_ROLE',
            component: (resolve) => require(['./views/system/role.vue'], resolve)
        },
        {
            path: 'menu',
            name: 'SYSTEM_MENU',
            component: (resolve) => require(['./views/system/menu.vue'], resolve)
        }
    ]
}];

export default routers;
