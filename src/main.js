import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import './libs/common';
import User from './store/user';
import App from './app.vue';
import 'iview/dist/styles/iview.css';


Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(iView);


// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();

    const token = Util.token();
    if (!token && to.name !== 'login') {
        // 未登录且不是前往登录界面，则跳转到登录界面
        next({
            name: 'login'
        });
    } else {
        Util.title(to.meta.title);
        next();

    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {User}
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});