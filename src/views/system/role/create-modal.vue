<template>
    <AppModal ref="modal" action="system/role/" method="post" title="新增角色" :model="role" :rules="rules" @success="handleSuccess">
        <AppInput :model="role" prop="roleCode" label="角色代码"/>
        <AppInput :model="role" prop="roleName" label="角色名称"/>
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
                 * 角色信息
                 */
                role: {},
                /**
                 * 表单的校验
                 */
                rules: {
                    roleCode: [
                        {required: true, message: '角色代码为必填项', trigger: 'blur'},
                        {pattern: /^ROLE[A-Z_]{0,28}$/, message: '以ROLE开头,纯大写,可带下划线,不超过32位', trigger: 'blur'},
                        {validator: this.validateRoleCode, trigger: 'blur'}
                    ],
                    roleName: [
                        {required: true, message: '角色名称为必填项', trigger: 'blur'},
                        {max: 32, message: '角色名称最多为32位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            /**
             * 校验角色代码是否存在
             */
            validateRoleCode: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                Http.get('validate/role?roleCode=' + value).then(() => {
                    callback();
                }).catch(respMsg => {
                    callback(new Error(respMsg));
                })
            },
            show: function () {
                this.role = {};
                this.$refs.modal.show();
            },
            handleSuccess(event) {
                this.$emit('success', event);
            }
        }
    }
</script>
