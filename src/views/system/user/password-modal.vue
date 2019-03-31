<template>
    <!--修改密码-->
    <AppModal ref="modal" :action="'system/user/' + user.userId " method="put" title="修改密码" :model="user"
              :rules="rules">
        <AppInput :model="user" prop="userId" label="用户ID" readonly :clearable="false"/>
        <AppInput :model="user" prop="email" label="电子邮箱" readonly :clearable="false"/>
        <AppInput :model="user" prop="password" label="新密码" clearable type="password"/>
    </AppModal>
</template>

<script>
    export default {
        data() {
            return {
                /**
                 * 用户信息
                 */
                user: {},
                /**
                 * 表单的校验
                 */
                rules: {
                    password: [
                        {required: true, message: '密码为必填项', trigger: 'blur'},
                        {min: 8, message: '密码最少为8位', trigger: 'blur'},
                        {max: 20, message: '密码最多为20位', trigger: 'blur'},
                        {pattern: /^[a-zA-Z0-9_]+$/, message: '只能由字母、数字和下划线组成', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            show: function (user) {
                this.user = user;
                this.$refs.modal.show();
            }
        }
    }
</script>
