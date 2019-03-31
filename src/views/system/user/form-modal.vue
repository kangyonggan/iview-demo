<template>
    <!--新增/编辑用户-->
    <AppModal ref="modal" :action="'system/user/' + (user.userId ? user.userId : '')"
              :method="user.userId ? 'put' : 'post'"
              :title="user.userId ? '编辑用户' : '新增用户'" :model="user" :rules="rules" @success="handleSuccess">
        <AppInput :model="user" prop="userId" label="用户ID" readonly :clearable="false" :v_if="!!user.userId"/>
        <AppInput :model="user" prop="email" label="电子邮箱" :clearable="!user.userId"/>
        <AppInput :model="user" prop="password" label="密码" clearable :v_if="!user.userId" type="password"/>
    </AppModal>
</template>

<script>
    import Http from '../../../libs/http';

    export default {
        props: {
            success: {
                type: Function
            }
        },
        data() {
            return {
                /**
                 * 用户信息
                 */
                user: {},
                /**
                 * 老的电子邮箱
                 */
                oldEmail: '',
                /**
                 * 表单的校验
                 */
                rules: {
                    email: [
                        {required: true, message: '电子邮箱为必填项', trigger: 'blur'},
                        {max: 64, message: '电子邮箱最多为64位', trigger: 'blur'},
                        {pattern: /^[a-zA-Z0-9_]+@[a-z0-9]+\.[a-z0-9]+$/, message: '电子邮箱格式错误', trigger: 'blur'},
                        {validator: this.validateEmail, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码为必填项', trigger: 'blur'},
                        {min: 8, message: '密码最少为8位', trigger: 'blur'},
                        {max: 20, message: '密码最多为20位', trigger: 'blur'},
                        {pattern: /^[a-zA-Z0-9_]+$/, message: '密码格式错误', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            /**
             * 校验用户名是否存在
             */
            validateEmail: function (rule, value, callback) {
                if (value === this.oldEmail) {
                    callback();
                    return;
                }

                let that = this;
                Http.get('validate/email?email=' + value).then(() => {
                    callback();
                }).catch(respMsg => {
                    callback(new Error(respMsg));
                })
            },
            show: function (user) {
                if (!user) {
                    user = {};
                }
                this.user = user;
                this.oldEmail = user.email;
                this.$refs.modal.show();
            },
            handleSuccess(event) {
                this.$emit('success', event);
            }
        }
    }
</script>
