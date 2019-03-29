import Http from '../libs/http';
import Util from '../libs/util';
import Routers from '../router';
import {store} from '../main';
import iView from 'iview';

export default {
    state: {
        user: {},
        menus: []
    },
    getters: {
        menuList: (state, getters, rootState) => {
            return Util.getMenuByRouter(Routers, state.menus);
        }
    },
    mutations: {
        setLoginData(state, data) {
            state.user = data.user;
            state.menus = data.menus;
        }
    },
    actions: {
        // 登录
        login({commit}, user) {
            return new Promise((resolve) => {
                Http.post('login', user).then(data => {
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
            if (!this.state.StoreApp.user.email) {
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
