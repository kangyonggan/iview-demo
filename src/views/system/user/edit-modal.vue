<template>
    <!--编辑用户-->
    <AppModal ref="modal" :action="'system/user/' + user.userId" method="put" title="编辑用户" :model="user" :rules="rules" @success="handleSuccess">
        <AppInput :model="user" prop="userId" label="用户ID" readonly :clearable="false"/>
        <AppInput :model="user" prop="email" label="电子邮箱" :clearable="true"/>
        <FormItem label="角色">
        </FormItem>
        <Transfer
            :data="allRoles"
            :target-keys="userRoles"
            @on-change="handleChange"></Transfer>
    </AppModal>
</template>

<script>
    import Http from '../../../libs/http';
    import Input from '../../../../dist/vendors';

    export default {
        components: {Input},
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
                 * 全部角色
                 */
                allRoles: [],
                /**
                 * 用户角色
                 */
                userRoles: [],
                /**
                 * 表单的校验
                 */
                rules: {
                    email: [
                        {required: true, message: '电子邮箱为必填项', trigger: 'blur'},
                        {max: 64, message: '电子邮箱最多为64位', trigger: 'blur'},
                        {pattern: /^[a-zA-Z0-9_]+@[a-z0-9]+\.[a-z0-9]+$/, message: '电子邮箱格式错误', trigger: 'blur'},
                        {validator: this.validateEmail, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            /**
             * 校验用户名是否存在
             */
            validateEmail: function (rule, value, callback) {
                if (!value || value === this.oldEmail) {
                    callback();
                    return;
                }

                Http.get('validate/email?email=' + value).then(() => {
                    callback();
                }).catch(respMsg => {
                    callback(new Error(respMsg));
                })
            },
            show: function (user) {
                const that = this;
                Http.get('system/user/' + user.userId + '/role').then(data => {
                    that.user = user;
                    that.oldEmail = user.email;
                    that.allRoles = that.filterItems(data.data.allRoles);
                    that.userRoles = that.filterKeys(data.data.userRoles);
                    that.user.roleIds = that.userRoles;
                    that.$refs.modal.show();
                }).catch(respMsg => {
                    that.error(respMsg);
                });
            },
            filterItems: function (items) {
                const data = [];
                for (const i in items) {
                    data[i] = {key: items[i].roleId + '', label: items[i].roleName};
                }

                return data;
            },
            filterKeys: function (items) {
                const data = [];
                for (const i in items) {
                    data[i] = items[i].roleId + '';
                }

                return data;
            },
            handleChange: function (newTargetKeys, direction, moveKeys) {
                this.userRoles = newTargetKeys;
                this.user.roleIds = newTargetKeys;
            },
            handleSuccess(event) {
                this.$emit('success', event);
            }
        }
    }
</script>
