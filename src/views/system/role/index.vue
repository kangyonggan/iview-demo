<template>
    <div>
        <!--搜索表单-->
        <Form ref="queryForm" :model="role" class="bg-white" inline>
            <AppInput :model="role" prop="roleCode" placeholder="请输入角色代码"/>
            <AppInput :model="role" prop="roleName" placeholder="请输入角色名称"/>
            <AppDatePicker :model="role" prop="startDate" placeholder="创建开始日期"/>
            <AppDatePicker :model="role" prop="endDate" placeholder="创建结束日期"/>
            <Row>
                <Button type="info" icon="ios-search" @click="$refs.table.refresh()">查询</Button>
                <Button type="warning" icon="ios-refresh-empty" @click="$refs.queryForm.resetFields()">清除</Button>
                <Button type="primary" icon="plus" @click="$refs.createModal.show()">新增</Button>
                <Button type="error" icon="ios-trash-outline" @click="remove">物理删除</Button>
            </Row>
        </Form>

        <!--表格-->
        <AppTable ref="table" url="system/role" :columns="columns" :form="$refs.queryForm" @dblclick="dblclick"/>

        <!--新增界面-->
        <CreateModal ref="createModal" @success="$refs.table.refresh()"/>

        <!--编辑界面-->
        <EditModal ref="editModal" @success="$refs.table.refresh()"/>
    </div>
</template>

<script>
    import CreateModal from './create-modal.vue';
    import EditModal from './edit-modal.vue';
    import Http from '../../../libs/http';

    export default {
        components: {CreateModal, EditModal},
        data() {
            return {
                /**
                 * 搜索表单的参数
                 */
                role: {},
                /**
                 * 表格的列
                 */
                columns: [
                    {
                        title: '角色ID',
                        key: 'roleId',
                        sortable: true
                    },
                    {
                        title: '角色代码',
                        key: 'roleCode',
                        sortable: true
                    },
                    {
                        title: '角色名称',
                        key: 'roleName',
                        sortable: true
                    },
                    {
                        title: '逻辑删除',
                        key: 'isDeleted',
                        sortable: true,
                        render: (h, params) => {
                            return this.status(h, params, 'system/role/' + params.row.roleId, this.$refs.table)
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
            }
        },
        methods: {
            /**
             * 双击编辑
             *
             * @param row
             */
            dblclick: function (row) {
                this.$refs.editModal.show({roleId: row.roleId, roleCode: row.roleCode, roleName: row.roleName});
            },
            /**
             * 物理删除
             */
            remove: function () {
                const row = this.$refs.table.getSelectionNow();
                if (!row.roleId) {
                    this.warning('请选择一行');
                } else {
                    const that = this;
                    that.$Modal.confirm({
                        title: '物理删除',
                        content: '确认删除所选记录？',
                        loading: true,
                        closable: true,
                        onOk: function () {
                            Http.del('system/role/' + row.roleId).then(data => {
                                that.success(data.respMsg);
                                that.$refs.table.refresh();
                            }).catch(respMsg => {
                                that.error(respMsg);
                            });
                            that.$Modal.remove();
                        }
                    })
                }
            }
        }
    }
</script>
