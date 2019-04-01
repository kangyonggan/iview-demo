<template>
    <AppModal ref="modal" action="system/user/" method="post" title="新增用户" :model="user" :rules="rules" @success="handleSuccess">
        <AppInput :model="user" prop="email" label="电子邮箱" clearable/>
        <AppInput :model="user" prop="password" label="密码" clearable type="password"/>
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
                        {pattern: /^[a-zA-Z0-9_]{8,20}$/, message: '密码必须是8至20位的字母、数字或下划线', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            /**
             * 校验用户名是否存在
             */
            validateEmail: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                Http.get('validate/email?email=' + value).then(() => {
                    callback();
                }).catch(respMsg => {
                    callback(new Error(respMsg));
                })
            },
            show: function () {
                this.user = {};
                this.$refs.modal.show();
            },
            handleSuccess(event) {
                this.$emit('success', event);
            }
        }
    }
</script>
