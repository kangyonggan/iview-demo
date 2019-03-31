export const login = req => {
    return {
        code: 200,
        respCo: '0000',
        respMsg: '响应成功',
        headers: {
            'x-auth-token': 'xxxxxxxx'
        }
    }
};

export const loginData = req => {
    return {
        code: 200,
        respCo: '0000',
        respMsg: '响应成功2',
        data: {
            user: {
                userId: 1,
                email: 'admin@kangyonggan.com'
            },
            menus: [{
                menuCode: 'SYSTEM',
                menuName: '系统',
                icon: '',
                children: [{
                    menuCode: 'SYSTEM_USER',
                    menuName: '用户管理',
                    sort: 0
                }, {
                    menuCode: 'SYSTEM_ROLE',
                    menuName: '角色管理',
                    sort: 1
                }, {
                    menuCode: 'SYSTEM_MENU',
                    menuName: '菜单管理',
                    sort: 2
                }]
            }]
        }
    }
};

export const logout = req => {
    return {
        code: 200,
        respCo: '0000',
        respMsg: '响应成功'
    }
};
