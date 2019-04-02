<template>
    <div>
        <!--搜索表单-->
        <Form ref="queryForm" :model="dict" class="bg-white" inline>
            <AppInput :model="dict" prop="dictType" placeholder="请输入字典类型"/>
            <AppInput :model="dict" prop="dictCode" placeholder="请输入字典代码"/>
            <AppDatePicker :model="dict" prop="startDate" placeholder="创建开始日期"/>
            <AppDatePicker :model="dict" prop="endDate" placeholder="创建结束日期"/>
            <Row>
                <Button type="info" icon="ios-search" @click="$refs.table.refresh()">查询</Button>
                <Button type="warning" icon="ios-refresh-empty" @click="$refs.queryForm.resetFields()">清除</Button>
                <Button type="primary" icon="plus" @click="$refs.formModal.show()">新增</Button>
                <Button type="error" icon="ios-trash-outline" @click="remove">物理删除</Button>
            </Row>
        </Form>

        <!--表格-->
        <AppTable ref="table" url="system/dict" :columns="columns" :form="$refs.queryForm" @dblclick="dblclick"/>

        <!--新增/编辑字典的界面-->
        <FormModal ref="formModal" @success="$refs.table.refresh()"/>
    </div>
</template>

<script>
    import FormModal from './form-modal.vue';
    import Http from '@/libs/http';

    export default {
        components: {FormModal},
        data() {
            return {
                /**
                 * 搜索表单的参数
                 */
                dict: {},
                /**
                 * 证件类型
                 */
                dictTypes: [],
                /**
                 * 表格的列
                 */
                columns: [
                    {
                        title: '字典ID',
                        key: 'dictId',
                        sortable: true
                    },
                    {
                        title: '字典类型',
                        key: 'dictType',
                        sortable: true,
                        render: (h, params) => {
                            return this.convertEnum(h, params.row.dictType, this.dictTypes);
                        }
                    },
                    {
                        title: '字典代码',
                        key: 'dictCode',
                        sortable: true
                    },
                    {
                        title: '值',
                        key: 'value',
                        sortable: true
                    },
                    {
                        title: '备注',
                        key: 'remark',
                        sortable: true
                    },
                    {
                        title: '排序',
                        key: 'sort',
                        sortable: true
                    },
                    {
                        title: '逻辑删除',
                        key: 'isDeleted',
                        sortable: true,
                        render: (h, params) => {
                            return this.status(h, params, 'system/dict/' + params.row.dictId, this.$refs.table);
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createdTime',
                        sortable: true,
                        render: (h, params) => {
                            return this.datetime(h, params.row.createdTime);
                        }
                    },
                    {
                        title: '更新时间',
                        key: 'updatedTime',
                        sortable: true,
                        render: (h, params) => {
                            return this.datetime(h, params.row.updatedTime);
                        }
                    }]
            };
        },
        mounted() {
            Http.get('enum/DictType/list').then(data => {
                this.dictTypes = data.data.enumList;
            }).catch(respMsg => {
                this.error(respMsg);
            });
        },
        methods: {
            /**
             * 双击编辑
             *
             * @param row
             */
            dblclick: function (row) {
                this.$refs.formModal.show({
                    dictId: row.dictId,
                    dictType: row.dictType,
                    dictCode: row.dictCode,
                    value: row.value,
                    remark: row.remark,
                    sort: row.sort
                });
            },
            /**
             * 物理删除
             */
            remove: function () {
                const row = this.$refs.table.getSelectionNow();
                if (!row.dictId) {
                    this.warning('请选择一行');
                } else {
                    const that = this;
                    that.$Modal.confirm({
                        title: '物理删除',
                        content: '确认删除所选记录？',
                        loading: true,
                        closable: true,
                        onOk: function () {
                            Http.del('system/dict/' + row.dictId).then(data => {
                                that.success(data.respMsg);
                                that.$refs.table.refresh();
                            }).catch(respMsg => {
                                that.error(respMsg);
                            });
                            that.$Modal.remove();
                        }
                    });
                }
            }
        }
    };
</script>
