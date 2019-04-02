<template>
    <AppForm ref="modal" action="user/profile/updatePassword" method="put" :model="user" :rules="rules"
             @success="handleSuccess">
        <AppInput :model="user" prop="userId" label="用户ID" readonly :clearable="false"/>
        <AppInput :model="user" prop="email" label="电子邮箱" readonly :clearable="false"/>

        <AppInput :model="user" prop="oldPassword" label="老密码" type="password"/>
        <AppInput :model="user" prop="password" label="新密码" type="password"/>
        <AppInput :model="user" prop="rePassword" label="确认密码" type="password"/>
    </AppForm>
</template>

<script>

    export default {
        data() {
            return {
                user: {},
                rules: {
                    oldPassword: [
                        {required: true, message: '老密码为必填项', trigger: 'blur'},
                        {pattern: /^[a-zA-Z0-9_]{8,20}$/, message: '密码必须是8至20位的字母、数字或下划线', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '新密码为必填项', trigger: 'blur'},
                        {pattern: /^[a-zA-Z0-9_]{8,20}$/, message: '密码必须是8至20位的字母、数字或下划线', trigger: 'blur'}
                    ],
                    rePassword: [
                        {required: true, message: '确认密码为必填项', trigger: 'blur'},
                        {validator: this.validateRePassword, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            validateRePassword: function (rule, value, callback) {
                if (value === this.user.password) {
                    callback();
                    return;
                }

                callback(new Error('两次输入的密码必须一致'));
            },
            handleSuccess() {
                this.user.oldPassword = '';
                this.user.password = '';
                this.user.rePassword = '';
            }
        },
        mounted() {
            const user = this.$store.state.StoreApp.user;
            this.user = {
                userId: user.userId,
                email: user.email
            };
        }
    };
</script>
