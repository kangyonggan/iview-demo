<template>
    <div>
        <!--搜索表单-->
        <Form ref="queryForm" :model="user" class="bg-white" inline>
            <AppInput :model="user" prop="email" placeholder="请输入电子邮箱" type="email"/>
            <AppDatePicker :model="user" prop="startDate" placeholder="注册开始日期"/>
            <AppDatePicker :model="user" prop="endDate" placeholder="注册结束日期"/>
            <Row>
                <Button type="info" icon="ios-search" @click="$refs.table.refresh()">查询</Button>
                <Button type="warning" icon="ios-refresh-empty" @click="$refs.queryForm.resetFields()">清除</Button>
                <Button type="primary" icon="plus" @click="$refs.createModal.show()">新增</Button>
                <Button type="error" icon="ios-trash-outline" @click="remove">物理删除</Button>
                <Button type="primary" icon="ios-eye-outline" @click="editPassword">修改密码</Button>
            </Row>
        </Form>

        <!--表格-->
        <AppTable ref="table" url="system/user" :columns="columns" :form="$refs.queryForm" @dblclick="dblclick"/>

        <!--新增界面-->
        <CreateModal ref="createModal" @success="$refs.table.refresh()"/>

        <!--编辑界面-->
        <EditModal ref="editModal" @success="$refs.table.refresh()"/>

        <!--修改密码界面-->
        <PasswordModal ref="passwordModal"/>
    </div>
</template>

<script>
    import CreateModal from './create-modal.vue';
    import PasswordModal from './password-modal.vue';
    import EditModal from './edit-modal.vue';
    import Http from '@/libs/http';

    export default {
        components: {CreateModal, PasswordModal, EditModal},
        data() {
            return {
                /**
                 * 搜索表单的参数
                 */
                user: {},
                /**
                 * 表格的列
                 */
                columns: [
                    {
                        title: '用户ID',
                        key: 'userId',
                        sortable: true
                    },
                    {
                        title: '电子邮箱',
                        key: 'email',
                        sortable: true
                    },
                    {
                        title: '逻辑删除',
                        key: 'isDeleted',
                        sortable: true,
                        render: (h, params) => {
                            return this.status(h, params, 'system/user/' + params.row.userId, this.$refs.table)
                        }
                    },
                    {
                        title: '注册时间',
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
                this.$refs.editModal.show({userId: row.userId, email: row.email});
            },
            /**
             * 修改密码
             */
            editPassword: function () {
                const row = this.$refs.table.getSelectionNow();
                if (!row.userId) {
                    this.warning('请选择一行');
                } else {
                    this.$refs.passwordModal.show({userId: row.userId, email: row.email});
                }
            },
            /**
             * 物理删除
             */
            remove: function () {
                const row = this.$refs.table.getSelectionNow();
                if (!row.userId) {
                    this.warning('请选择一行');
                } else {
                    const that = this;
                    that.$Modal.confirm({
                        title: '物理删除',
                        content: '确认删除所选记录？',
                        loading: true,
                        closable: true,
                        onOk: function () {
                            Http.del('system/user/' + row.userId).then(data => {
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
