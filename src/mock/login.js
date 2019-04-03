export const login = req => {
    console.log('login');
    console.log(req);
    const header = {};
    header['x-auth-token'] = 'c0f408af-1767-45d4-b826-5376b7e20d43';
    req.header = header;
    return {
        'respCo': '0000',
        'respMsg': '响应成功'
    };
};

export const loginData = req => {
    console.log('loginData');
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
    };
};

export const logout = req => {
    return {
        code: 200,
        respCo: '0000',
        respMsg: '响应成功'
    };
};
