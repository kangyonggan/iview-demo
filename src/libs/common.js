import Vue from 'vue';
import Http from '../libs/http';

// 定义全局方法
Vue.prototype.error = error;
Vue.prototype.success = success;
Vue.prototype.warning = warning;
Vue.prototype.status = status;
Vue.prototype.date = date;
Vue.prototype.datetime = datetime;

/**
 * 错误
 *
 * @param respMsg
 */
function error(respMsg) {
    this.$Notice.error({
        title: '错误',
        desc: respMsg,
        duration: 3
    });
}

/**
 * 成功
 *
 * @param respMsg
 */
function success(respMsg) {
    this.$Notice.success({title: '消息', desc: respMsg});
}

/**
 * 警告
 *
 * @param respMsg
 */
function warning(respMsg) {
    this.$Notice.warning({
        title: '警告',
        desc: respMsg,
        duration: 2
    });
}

/**
 * 更新状态
 *
 * @param h
 * @param params
 * @param url
 * @param table
 * @returns {*}
 */
function status(h, params, url, table) {
    let that = this;
    let row = params.row;
    if (row.isDeleted) {
        return h('Tag', {props: {type: 'dot', color: 'red'}}, [
            h('a', {
                style: {color: '#495060'},
                on: {
                    click: () => {
                        if (!url) {
                            return;
                        }
                        let that = this;
                        that.$Modal.confirm({
                            title: '恢复确认',
                            content: '确认恢复所选记录？',
                            loading: true,
                            closable: true,
                            onOk: function () {
                                const data = {isDeleted: 1 * !row.isDeleted};
                                Http.put(url, data).then(data => {
                                    that.success(data.respMsg);
                                    if (table) {
                                        table.refresh();
                                    }
                                }).catch(respMsg => {
                                    that.error(respMsg);
                                });
                                that.$Modal.remove();
                            }
                        })
                    }
                }
            }, '已删除')
        ])
    }
    return h('Tag', {props: {type: 'dot', color: 'green'}}, [
        h('a', {
            style: {color: '#495060'},
            on: {
                click: () => {
                    if (!url) {
                        return
                    }
                    let that = this;
                    that.$Modal.confirm({
                        title: '删除确认',
                        content: '确认删除所选记录？',
                        loading: true,
                        closable: true,
                        onOk: function () {
                            const data = {isDeleted: 1 * !row.isDeleted};
                            Http.put(url, data).then(data => {
                                that.success(data.respMsg);
                                if (table) {
                                    table.refresh();
                                }
                            }).catch(respMsg => {
                                that.error(respMsg);
                            });
                            that.$Modal.remove();
                        }
                    })
                }
            }
        }, '未删除')
    ])
}

/**
 * 显示日期
 *
 * @param h
 * @param timestamp
 */
function date(h, timestamp) {
    const date = new Date();
    date.setTime(timestamp);
    return h('span', date.format("yyyy-MM-dd"));
}

/**
 * 显示日期时间
 *
 * @param h
 * @param timestamp
 */
function datetime(h, timestamp) {
    const date = new Date();
    date.setTime(timestamp);
    return h('span', date.format("yyyy-MM-dd HH:mm:ss"));
}

/**
 * 日期时间格式化
 *
 * @param format
 * @returns {*}
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "H+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return format;
};
