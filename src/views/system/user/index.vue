<template>
    <div>
        <!--搜索表单-->
        <Form ref="queryForm" :model="user" class="bg-white" inline>
            <AppInput :model="user" prop="email" placeholder="请输入电子邮箱"/>
            <AppDatePicker :model="user" prop="startDate" placeholder="注册开始日期"/>
            <AppDatePicker :model="user" prop="endDate" placeholder="注册结束日期"/>
            <Row>
                <Button type="info" icon="ios-search" @click="$refs.table.refresh()">查询</Button>
                <Button type="warning" icon="ios-refresh-empty" @click="$refs.queryForm.resetFields()">清除</Button>
                <Button type="primary" icon="plus">新增</Button>
            </Row>
        </Form>

        <!--表格-->
        <AppTable ref="table" url="system/user" :columns="columns" :form="$refs.queryForm"/>
    </div>
</template>

<script>
    export default {
        components: {},
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
                            return this.status(h, params, 'system/user/' +
                                params.row.userId + '/delete/' + 1 * !params.row.isDeleted,
                                this.$refs.table)
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
        }
    }
</script>
