import Cookies from 'js-cookie';

let util = {};

/**
 * 令牌存放在Cookie中的key
 *
 * @type {string}
 */
util.tokenKey = 'x-auth-token';

/**
 * 设置浏览器标题
 *
 * @param title
 */
util.title = function (title) {
    title = title ? title + ' - 后台管理系统' : '后台管理系统';
    window.document.title = title;
};

/**
 * 从Cookie中获取令牌
 *
 * @returns {*}
 */
util.token = function () {
    const token = Cookies.get(this.tokenKey);
    if (token) {
        return token;
    }
    return false;
};

/**
 * 从Cookie中移除令牌
 */
util.removeToken = function () {
    Cookies.set(this.tokenKey, '', {expires: -1});
};

/**
 * 向Cookie中添加令牌
 */
util.setToken = function (token) {
    Cookies.set(this.tokenKey, token, {expires: 30});
};

/**
 * 拼接请求参数
 *
 * @param data
 * @returns {*}
 */
util.params = function (data) {
    if (data.constructor !== Object) {
        return data;
    }

    let arr = [];
    for (let key in data) {
        let obj = data[key];
        if (obj === undefined || obj === null) {
            continue;
        }
        if (obj.constructor === Array) {
            let a = [];
            for (let i in obj) {
                a.push(encodeURI(params(obj[i])));
            }
            arr.push(key + '=' + a.join(','));
        } else if (obj.constructor === Object) {
            arr.push(key + '=' + params(obj));
        } else {
            arr.push(key + '=' + encodeURI(obj));
        }
    }
    return arr;
};

/**
 * 求两个数组的交集
 *
 * @param arr1
 * @param arr2
 * @returns {...*[]}
 */
util.getIntersection = function (arr1, arr2) {
    return Array.from(new Set([...arr1, ...arr2]));
};

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
util.getMenuByRouter = function (list, menus) {
    let res = [];

    for (let i in menus) {
        let menu = menus[i];
        let route = menuInRouters(list, menu.menuCode);
        if (route) {
            let obj = {
                icon: menu.icon || '',
                meta: {
                    title: menu.menuName
                },
                name: menu.menuCode
            };
            if (hasChild(menu)) {
                obj.children = util.getMenuByRouter(list, menu.children);
            }
            res.push(obj);
        }
    }

    return res;
};

function menuInRouters(list, menuCode) {
    for (let i in list) {
        let route = list[i];
        if (route.name === menuCode) {
            return route;
        } else if (hasChild(route)) {
            let rt = menuInRouters(route.children, menuCode);
            if (rt) {
                return rt;
            }
        }
    }

    return null;
}

function hasChild(item) {
    return item.children && item.children.length !== 0;
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @param {*} title 新添加的路由的显示名称
 * @description 如果该newRoute已经存在则更新(考虑到带参数路由)
 */
util.getNewTagList = function (list, newRoute, title) {
    const {name, path, meta} = newRoute;
    meta.title = title;
    let newList = [...list];
    let index = newList.findIndex(item => item.name === name);
    if (index >= 0) {
        newList[index] = {name, path, meta};
    } else {
        newList.push({name, path, meta});
    }
    return newList;
};

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
util.getBreadCrumbList = function (routeMetched) {
    let res = routeMetched.map(item => {
        let obj = {
            icon: (item.meta && item.meta.icon) || '',
            name: item.name,
            meta: item.meta
        };
        return obj;
    });
    res = res.filter(item => {
        return !item.meta.hideInMenu;
    });

    return [{
        name: 'home',
        to: '/home',
        icon: 'ios-home'
    }, ...res];
};

/**
 * @description 本地存储和获取标签导航列表
 */
util.setTagNavListInLocalstorage = function (userId, list) {
    Cookies.set('tagNaveList_' + userId, list);
};

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
util.getTagNavListFromLocalstorage = function (userId) {
    const list = Cookies.get('tagNaveList_' + userId);
    return list ? JSON.parse(list) : [];
};

/**
 * 获取route的title
 *
 * @param menus
 * @param route
 */
util.getRouteTitle = function (menus, route) {
    for (let i in menus) {
        let menu = menus[i];
        if (menu.name === route.name) {
            return menu.meta.title;
        } else if (hasChild(menu)) {
            let title = util.getRouteTitle(menu.children, route);
            if (title) {
                return title;
            }
        }
    }

    return route.meta.title;
};

/**
 * 存储锁屏前的界面
 *
 * @param pageName
 */
util.setLockPage = function (pageName) {
    Cookies.set('last_page_name', pageName);
    Cookies.set('locking', '1');
};

/**
 * 获取锁屏前的界面
 *
 * @returns {*}
 */
util.getLockPage = function () {
    let lastPageName = Cookies.get('last_page_name');
    if (lastPageName) {
        return lastPageName;
    }

    return 'home';
};

/**
 * 解锁
 */
util.unlock = function () {
    Cookies.set('locking', '0');
};

/**
 * 获取锁屏状态
 *
 * @returns {number}
 */
util.getLockStatus = function () {
    return parseInt(Cookies.get('locking'));
};

export default util;
