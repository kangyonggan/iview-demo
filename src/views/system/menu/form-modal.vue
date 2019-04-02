<template>
    <AppModal ref="modal" :action="'system/menu/' + (menu.menuId ? menu.menuId : '')" :method="menu.menuId ? 'put' : 'post'"
              :title="(menu.menuId ? '编辑' : '新增') + '菜单'" :model="menu" :rules="rules"
              @success="handleSuccess">
        <AppInput :v-if="!menu.menuId" :model="menu" prop="parentName" label="父菜单" readonly :clearable="false"/>
        <AppInput :model="menu" prop="menuCode" label="菜单代码"/>
        <AppInput :model="menu" prop="menuName" label="菜单名称"/>
        <AppInput :model="menu" prop="icon" label="图标"/>
        <AppInput :model="menu" prop="sort" label="排序"/>
    </AppModal>
</template>

<script>
    import Http from '@/libs/http';

    export default {
        props: {
            success: {
                type: Function
            }
        },
        data() {
            return {
                /**
                 * 菜单信息
                 */
                menu: {},
                oldMenuCode: '',
                /**
                 * 表单的校验
                 */
                rules: {
                    menuCode: [
                        {required: true, message: '菜单代码为必填项', trigger: 'blur'},
                        {pattern: /^[A-Z_]{1,32}$/, message: '纯大写,可带下划线,不超过32位', trigger: 'blur'},
                        {validator: this.validateMenuCode, trigger: 'blur'}
                    ],
                    menuName: [
                        {required: true, message: '菜单名称为必填项', trigger: 'blur'},
                        {max: 32, message: '菜单名称最多为32位', trigger: 'blur'}
                    ],
                    icon: [
                        {max: 128, message: '图标最多为128位', trigger: 'blur'}
                    ],
                    sort: [
                        {pattern: /^[0-9]*$/, message: '必须是自然数', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            /**
             * 校验菜单代码是否存在
             */
            validateMenuCode: function (rule, value, callback) {
                if (!value || this.oldMenuCode === value) {
                    callback();
                    return
                }

                Http.get('validate/menu?menuCode=' + value).then(() => {
                    callback()
                }).catch(respMsg => {
                    callback(new Error(respMsg));
                })
            },
            show: function (menu) {
                this.menu = menu;
                this.oldMenuCode = menu.menuCode;
                this.$refs.modal.show();
            },
            handleSuccess() {
                this.$emit('success');
            }
        }
    }
</script>
