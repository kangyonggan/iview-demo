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
            meta: {
                title: '首页'
            },
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
}, {
    path: '/locking',
    name: 'locking',
    meta: {
        title: '锁屏'
    },
    component: (resolve) => require(['./views/main/components/locking.vue'], resolve)
}, {
    path: '/system',
    name: 'SYSTEM',
    component: (resolve) => main(resolve),
    children: [
        {
            path: 'user',
            name: 'SYSTEM_USER',
            component: (resolve) => require(['./views/system/user/index.vue'], resolve)
        },
        {
            path: 'role',
            name: 'SYSTEM_ROLE',
            component: (resolve) => require(['./views/system/role/index.vue'], resolve)
        },
        {
            path: 'menu',
            name: 'SYSTEM_MENU',
            component: (resolve) => require(['./views/system/menu/index.vue'], resolve)
        },
        {
            path: 'dict',
            name: 'SYSTEM_DICT',
            component: (resolve) => require(['./views/system/dict/index.vue'], resolve)
        }
    ]
}, {
    path: '/user',
    name: 'USER',
    component: (resolve) => main(resolve),
    children: [
        {
            path: 'profile',
            name: 'USER_PROFILE',
            component: (resolve) => require(['./views/user/profile/index.vue'], resolve)
        }
    ]
}, {
    path: '/403',
    name: ' 403',
    component: (resolve) => require(['./views/error/403.vue'], resolve)
}, {
    path: '/*',
    name: '404',
    component: (resolve) => require(['./views/error/404.vue'], resolve)
}];

export default routers;
