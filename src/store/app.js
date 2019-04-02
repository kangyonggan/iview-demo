import Http from '@/libs/http';
import Util from '@/libs/util';
import Routers from '@/router';
import {store} from '@/main';

export default {
    state: {
        user: {},
        menus: [],
        breadCrumbList: [],
        tagNavList: [{
            name: 'home',
            meta: {
                title: '首页'
            }
        }]
    },
    getters: {
        menus: (state, getters, rootState) => {
            return state.menus;
        }
    },
    mutations: {
        setLoginData(state, data) {
            state.user = data.user;
            state.menus = Util.getMenuByRouter(Routers, data.menus);
        },
        setBreadCrumb(state, routeMetched) {
            state.breadCrumbList = Util.getBreadCrumbList(routeMetched);
        },
        setTagNavList(state, list) {
            if (list) {
                state.tagNavList = list;
                Util.setTagNavListInLocalstorage(state.user.userId, state.tagNavList);
            } else {
                list = Util.getTagNavListFromLocalstorage(state.user.userId);
                if (list.length > 0) {
                    state.tagNavList = list;
                }
            }
        }
    },
    actions: {
        // 登录
        login({commit}, user) {
            return new Promise((resolve) => {
                Http.post('login', user).then(data => {
                    commit('setLoginData', {user: {}, menus: []});
                    store.dispatch('ready').then(data => {
                        resolve(data);
                    });
                }).catch(respMsg => {
                    resolve({respCo: '9999', respMsg: respMsg});
                });
            });
        },
        // 检测必备的数据
        ready({commit}) {
            if (this.state.StoreApp.menus.length === 0) {
                return new Promise((resolve) => {
                    Http.get('login/data').then(data => {
                        commit('setLoginData', data.data);
                        resolve({respCo: '0000'});
                    }).catch(respMsg => {
                        Util.removeToken();
                        commit('setLoginData', {
                            user: {},
                            menus: []
                        });
                        resolve({respCo: '9999', respMsg: respMsg});
                    });
                });
            }

            return {respCo: '0000'};
        },
        // 重新加载数据
        reload({commit}) {
            return new Promise((resolve) => {
                Http.get('login/data').then(data => {
                    commit('setLoginData', data.data);
                    resolve({respCo: '0000'});
                }).catch(respMsg => {
                    Util.removeToken();
                    commit('setLoginData', {
                        user: {},
                        menus: []
                    });
                    resolve({respCo: '9999', respMsg: respMsg});
                });
            });
        },
        // 退出
        logout() {
            return new Promise((resolve) => {
                Http.get('logout').then(data => {
                    resolve(data);
                    Util.removeToken();
                }).catch(respMsg => {
                    resolve({respCo: '9999', respMsg: respMsg});
                });
            });
        }
    }
};
