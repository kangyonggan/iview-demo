<template>
    <AppModal ref="modal" :action="'system/role/' + role.roleId" method="put" title="编辑角色" :model="role" :rules="rules"
              @success="handleSuccess">
        <AppInput :model="role" prop="roleId" label="角色ID" readonly :clearable="false"/>
        <AppInput :model="role" prop="roleCode" label="角色代码"/>
        <AppInput :model="role" prop="roleName" label="角色名称"/>
        <AppTree ref="tree" showCheckbox @checkChange="checkChange"/>
    </AppModal>
</template>

<script>
    import Http from '@/libs/http';

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
                 * 全部菜单
                 */
                allMenus: [],
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
                const that = this;
                Http.get('system/role/' + role.roleId + '/menu').then(data => {
                    that.role = role;
                    that.oldRoleCode = role.roleCode;
                    that.allMenus = that.filterMenus(data.data);
                    that.role.menuIds = data.data.roleMenus;
                    that.$refs.tree.init(that.allMenus);
                    that.$refs.modal.show();
                }).catch(respMsg => {
                    that.error(respMsg);
                });
            },
            filterMenus: function (data) {
                const result = [];
                for (const i in data.allMenus) {
                    result.push(this.$refs.tree.toMenuItem(data.allMenus[i], data.roleMenus, 'menuId', 'menuName', 'icon', 'children'));
                }
                return result;
            },
            handleSuccess(event) {
                this.$emit('success', event);
            },
            checkChange: function (selected) {
                this.role.menuIds = selected;
            }
        }
    };
</script>
