<template>
    <AppModal ref="modal" :action="'system/dict/' + (dict.dictId ? dict.dictId : '')" :method="dict.dictId ? 'put' : 'post'" :title="dict.dictId ? '编辑' : '新增' + '字典'" :model="dict" :rules="rules" @success="handleSuccess">
        <AppInput :v_if="!!dict.dictId" :model="dict" prop="dictId" label="字典ID" readonly :clearable="false"/>
        <AppSelect :model="dict" prop="dictType" label='字典类型' :items="dictTypes" clearable/>
        <AppInput :model="dict" prop="dictCode" label="字典代码" clearable/>
        <AppInput :model="dict" prop="value" label="值" clearable/>
        <AppInput :model="dict" prop="remark" label="备注" clearable/>
        <AppInput :model="dict" prop="sort" label="排序" clearable/>
    </AppModal>
</template>

<script>
    import Http from '../../../libs/http';

    export default {
        props: {
            success: {
                type: Function
            },
            dictTypes: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                /**
                 * 字典信息
                 */
                dict: {},
                oldDictType: '',
                oldDictCode: '',
                /**
                 * 表单的校验
                 */
                rules: {
                    dictType: [
                        {required: true, message: '字典类型为必填项', trigger: 'blur'}
                    ],
                    dictCode: [
                        {required: true, message: '字典代码为必填项', trigger: 'blur'},
                        {max: 64, message: '字典代码最多为64位', trigger: 'blur'},
                        {validator: this.validateDictCode, trigger: 'blur'}
                    ],
                    value: [
                        {required: true, message: '字典名称为必填项', trigger: 'blur'},
                        {max: 256, message: '字典名称最多为256位', trigger: 'blur'}
                    ],
                    remark: [
                        {max: 256, message: '备注最多256位', trigger: 'blur'}
                    ],
                    sort: [
                        {pattern: /^[0-9]*$/, message: '必须是自然数', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            /**
             * 校验字典代码是否存在
             */
            validateDictCode: function (rule, value, callback) {
                if (!value || !this.dict.dictType || (this.oldDictCode === value && this.oldDictType === this.dict.dictType)) {
                    callback();
                    return;
                }

                Http.get('validate/dict?dictType=' + this.dict.dictType + '&dictCode=' + value).then(() => {
                    callback();
                }).catch(respMsg => {
                    callback(new Error(respMsg));
                })
            },
            show: function (dict) {
                if (!dict) {
                    dict = {};
                }
                this.dict = dict;
                this.oldDictType = dict.dictType;
                this.oldDictCode = dict.dictCode;
                this.$refs.modal.show();
            },
            handleSuccess(event) {
                this.$emit('success', event);
            }
        }
    }
</script>
