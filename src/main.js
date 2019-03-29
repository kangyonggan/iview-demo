import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import './libs/common';
import StoreApp from './store/app';
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

    let token = Util.token();
    if (to.name === 'login') {
        // 前往登录界面的放行
        next();
    } else if (!token) {
        // 未登陆的前往登录界面
        next({
            name: 'login'
        });
    } else {
        store.dispatch('ready').then(data => {
            if (data.respCo === '0000') {
                // 正常，放行
                next();
            } else {
                // 异常，到登录界面
                iView.Message.error('您尚未登录或登录已失效！');
                next({
                    name: 'login'
                });
            }
        });
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {StoreApp}
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
