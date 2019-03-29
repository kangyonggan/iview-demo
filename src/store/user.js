import Http from '../libs/http';

export default {
    state: {},
    mutations: {},
    actions: {
        // 登录
        login({commit}, user) {
            return new Promise((resolve) => {
                Http.post('login', user).then(data => {
                    resolve(data);
                }).catch(respCo => {
                    resolve({respCo: respCo});
                });
            });
        }
    }
};
