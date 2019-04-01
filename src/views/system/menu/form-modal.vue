<template>
    <AppModal ref="modal" :action="'system/menu/' + (menu.menuId ? menu.menuId : '')" :method="menu.menuId ? 'put' : 'post'"
              :title="(menu.menuId ? '编辑' : '新增') + '菜单'" :model="menu" :rules="rules"
              @success="handleSuccess">
        <AppInput :v_if="!menu.menuId" :model="menu" prop="parentName" label="父菜单" readonly :clearable="false"/>
        <AppInput :model="menu" prop="menuCode" label="菜单代码" clearable/>
        <AppInput :model="menu" prop="menuName" label="菜单名称" clearable/>
        <AppInput :model="menu" prop="icon" label="图标" clearable/>
        <AppInput :model="menu" prop="sort" label="排序" clearable/>
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
                 * 菜单信息
                 */
                menu: {},
                oldMenuCode: '',
                /**
                 * 表单的校验
                 */
                rules: {

                }
            }
        },
        methods: {
            /**
             * 校验菜单代码是否存在
             */
            validateMenu: function (rule, value, callback) {
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
