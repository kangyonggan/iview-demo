<template>
    <FormItem :prop="prop" :label="label">
        <Select v-model="model[prop]" :placeholder="placeholder ? placeholder : '请选择' + label" :disabled="disabled">
            <Option v-for="item in list" :value='item.code' :key="item.code">
                {{item.name}}
            </Option>
        </Select>
    </FormItem>
</template>

<script>
    import Vue from 'vue';
    import Http from '@/libs/http';

    const AppSelect = {
        props: {
            model: {
                required: true,
                type: Object
            },
            prop: {
                required: true,
                type: String
            },
            label: {
                type: String
            },
            placeholder: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            },
            enumKey: {
                type: String,
                default: ''
            },
            dictType: {
                type: String,
                default: ''
            },
            items: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data() {
            return {
                list: []
            };
        },
        mounted() {
            this.list = [...this.items];
            if (this.enumKey) {
                this.loadEnumList();
            }
            if (this.dictType) {
                this.loadDictList();
            }
        },
        methods: {
            loadEnumList: function () {
                Http.get('enum/' + this.enumKey + '/list').then(data => {
                    this.list = [...data.data.enumList];
                }).catch(respMsg => {
                    this.error(respMsg);
                });
            },
            loadDictList: function () {
                Http.get('dict/' + this.dictType).then(data => {
                    for (const i in data.data.dicts) {
                        const dict = data.data.dicts[i];
                        this.list.push({
                            code: dict.dictCode,
                            name: dict.value
                        });
                    }
                }).catch(respMsg => {
                    this.error(respMsg);
                });
            }
        }
    };

    export default AppSelect;

    Vue.component('AppSelect', AppSelect);
</script>
