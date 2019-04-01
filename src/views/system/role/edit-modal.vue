<template>
    <AppModal ref="modal" :action="'system/role/' + role.roleId" method="put" title="编辑角色" :model="role" :rules="rules"
              @success="handleSuccess">
        <AppInput :model="role" prop="roleId" label="角色ID" readonly :clearable="false"/>
        <AppInput :model="role" prop="roleCode" label="角色代码" :clearable="true"/>
        <AppInput :model="role" prop="roleName" label="角色名称" :clearable="true"/>
    </AppModal>
</template>

<script>
    import Http from '../../../libs/http';

    export default {
        data() {
            return {
                /**
                 * 角色信息
                 */
                role: {},
                /**
                 * 老的就是代码
                 */
                oldRoleCode: '',
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
            };
        },
        methods: {
            /**
             * 校验角色名是否存在
             */
            validateRoleCode: function (rule, value, callback) {
                if (!value || value === this.oldRoleCode) {
                    callback();
                    return;
                }

                Http.get('validate/role?roleCode=' + value).then(() => {
                    callback();
                }).catch(respMsg => {
                    callback(new Error(respMsg));
                });
            },
            show: function (role) {
                this.role = role;
                this.oldRoleCode = role.roleCode;
                this.$refs.modal.show();
            },
            handleSuccess(event) {
                this.$emit('success', event);
            }
        }
    };
</script>
