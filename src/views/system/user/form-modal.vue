<template>
    <!--新增/编辑用户-->
    <AppModal ref="modal" action="system/user" :method="user.id ? 'put' : 'post'"
              :title="user.userId ? '编辑用户' : '新增用户'" :model="user" :rules="rules" @success="handleSuccess">
        <FormItem label="电子邮箱" prop="email">
            <Input v-model="user.email" :readonly="!!user.userId" placeholder="请输入电子邮箱" :clearable="!user.userId"/>
        </FormItem>
        <FormItem label="密码" prop="password" v-if="!user.userId">
            <Input type="password" v-model="user.password" placeholder="请输入密码" clearable/>
        </FormItem>
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
                 * 老的用户名
                 */
                oldEmail: '',
                /**
                 * 表单的校验
                 */
                rules: {
                    email: [
                        {required: true, message: '电子邮箱为必填项', trigger: 'blur'},
                        {max: 64, message: '电子邮箱最多为64位', trigger: 'blur'},
                        {pattern: /^[a-zA-Z0-9_]+@[a-z0-9]+\.[a-z0-9]+$/, message: '电子邮箱格式错误', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码为必填项', trigger: 'blur'},
                        {min: 8, message: '密码最少为6位', trigger: 'blur'},
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
                Http.get('validate/user?email=' + value).then(() => {
                    callback();
                }).catch(respMsg => {
                    callback(respMsg);
                    that.error(respMsg, true);
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
