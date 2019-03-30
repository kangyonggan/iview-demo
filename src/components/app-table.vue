<template>
    <div style="margin-top: 10px; margin-bottom: 20px;">
        <!--表格-->
        <Table :loading="loading" border :columns="columns" :data="pageInfo.list" @on-selection-change="selectionChange"
               @on-sort-change="sortChange"/>

        <!--分页-->
        <Page v-if="pagination" v-show="pageInfo.pages > 0" :current="params.pageNum" :total="pageInfo.total" show-total
              show-sizer show-elevator :style="{marginTop: '20px'}"
              @on-change="jump"
              @on-page-size-change="changePageSize"></Page>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Http from '../libs/http';

    const AppTable = {
        props: {
            url: {
                required: true,
                type: String
            },
            columns: {
                required: true,
                type: Array
            },
            form: {
                type: Object
            },
            sort: {
                type: String
            },
            desc: {
                type: Boolean,
                default: true
            },
            pagination: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                /**
                 * 分页参数
                 */
                params: {
                    pageNum: 1
                },
                /**
                 * 分页信息
                 */
                pageInfo: {},
                /**
                 * 表格加载中
                 */
                loading: false,
                /**
                 * 已选择的行
                 */
                selection: []
            }
        },
        mounted: function () {
            if (this.sort) {
                this.params._sort = this.sort;
                this.params._order = this.desc ? 'desc' : 'asc';
            }
            this.refresh();
        },
        methods: {
            /**
             * 选中行发生变化时调用
             *
             * @param selection 已选项数据
             */
            selectionChange: function (selection) {
                this.selection = selection;
            },
            /**
             * 刷新
             */
            refresh: function () {
                this.loading = true;
                let params = this.form ? Object.assign(this.params, this.form.model || {}) : this.params;
                Http.get(this.url, params).then(data => {
                    this.loading = false;
                    if (data.respCo === '0000') {
                        this.pageInfo = data.data.pageInfo;
                    } else {
                        this.error(data.respMsg);
                    }
                }).catch(respMsg => {
                    this.loading = false;
                    this.error(respMsg);
                })
            },
            /**
             * 修改分页大小
             */
            changePageSize: function (pageSize) {
                this.params.pageSize = pageSize;
                this.jump(1);
            },
            /**
             * 跳转
             */
            jump: function (pageNum) {
                this.params.pageNum = pageNum;

                this.refresh();
            },
            /**
             * 排序
             */
            sortChange: function (e) {
                if (e.order !== 'normal') {
                    this.params._sort = e.key;
                    this.params._order = e.order;
                } else {
                    this.params._sort = null;
                    this.params._order = null;
                }

                this.jump(1);
            },
            /**
             * 判断是否有选中的行
             *
             * @returns {boolean}
             */
            hasSelection: function () {
                return this.selection.length > 0;
            },
            /**
             * 获取选中的行
             *
             * @returns {*|Array}
             */
            getSelection: function () {
                return this.selection;
            },
            /**
             * 获取选中的行(带有筛选条件)
             *
             * @param name
             * @param value
             * @returns {*|Array}
             */
            getSelectionWithCondition: function (name, value) {
                let arr = [];
                for (let i = 0; i < this.selection.length; i++) {
                    if (this.selection[i][name] === value) {
                        arr.push(this.selection[i]);
                    }
                }

                return arr;
            },
            /**
             * 获取选中的行（指定字段）
             *
             * @param field
             * @returns {Array}
             */
            getSelectionFields: function (field) {
                let arr = [];
                for (let i = 0; i < this.selection.length; i++) {
                    arr.push(this.selection[i][field]);
                }

                return arr;
            },
            /**
             * 获取选中的行（指定字段,并带有筛选条件）
             *
             * @param field
             * @param name
             * @param value
             * @returns {Array}
             */
            getSelectionFieldsWithCondition: function (field, name, value) {
                let arr = [];
                for (let i = 0; i < this.selection.length; i++) {
                    if (this.selection[i][name] === value) {
                        arr.push(this.selection[i][field]);
                    }
                }

                return arr;
            }
        }
    };

    export default AppTable;

    Vue.component('AppTable', AppTable);
</script>
